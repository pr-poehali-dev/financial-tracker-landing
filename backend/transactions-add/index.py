import json
import os
from typing import Dict, Any
from decimal import Decimal
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, date

def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Add new transaction to database
    Args: event - dict with httpMethod, headers with X-User-Id, body with transaction data
          context - object with request_id, function_name
    Returns: HTTP response dict with created transaction or error
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_id = headers.get('X-User-Id') or headers.get('x-user-id')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'User ID required'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    title = body_data.get('title', '').strip()
    category = body_data.get('category', '').strip()
    amount = body_data.get('amount')
    tx_type = body_data.get('type', 'expense')
    icon = body_data.get('icon', 'Circle')
    date = body_data.get('date', datetime.now().date().isoformat())
    
    if not title or not category or amount is None:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Title, category and amount are required'}),
            'isBase64Encoded': False
        }
    
    if tx_type not in ['income', 'expense']:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Type must be income or expense'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute(
        """INSERT INTO transactions (user_id, title, category, amount, type, icon, date)
           VALUES (%s, %s, %s, %s, %s, %s, %s)
           RETURNING id, title, category, amount, type, icon, date, created_at""",
        (user_id, title, category, amount, tx_type, icon, date)
    )
    new_transaction = cur.fetchone()
    conn.commit()
    
    cur.close()
    conn.close()
    
    transaction_dict = {
        'id': new_transaction['id'],
        'title': new_transaction['title'],
        'category': new_transaction['category'],
        'amount': float(new_transaction['amount']),
        'type': new_transaction['type'],
        'icon': new_transaction['icon'],
        'date': new_transaction['date'].isoformat() if hasattr(new_transaction['date'], 'isoformat') else str(new_transaction['date']),
        'created_at': new_transaction['created_at'].isoformat() if hasattr(new_transaction['created_at'], 'isoformat') else str(new_transaction['created_at'])
    }
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(transaction_dict),
        'isBase64Encoded': False
    }