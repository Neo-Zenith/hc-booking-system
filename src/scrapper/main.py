import pandas as pd
import requests as re
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def scrapper():
    url = "https://wis.ntu.edu.sg/pls/webexe/FBSDOCU.FBSLOCATN"
    response = re.get(url)

    if response.status_code == 200:
        tables = pd.read_html(response.text, header=0)
        table = tables[0]
        table.drop('Bookable by staff', axis=1, inplace=True)
        table['SPINES'] = table['SPINES'].str.title()
        table['description'] = table['SPINES'] + ' ' + table['FACILITY']
        table.drop('SPINES', axis=1, inplace=True)
        table.rename(columns={'FACILITY': 'name', 'CAPACITY': 'capacity', 'LOCATION': 'location'}, inplace=True)
        table = table[table['Bookable by student organisations'] == 'YES']
        table.drop('Bookable by student organisations', axis=1, inplace=True)
        
        for idx, row in table.iterrows():
            data, count = supabase.table('venues').insert(
                {
                    "name": row['name'], 
                    "description": row['description'],
                    "capacity": row['capacity'],
                    "location": row['location']
                }
                ).execute()
            print(data, count)

    else:
        print('Failed to fetch the URL:', response.status_code)

scrapper()
    