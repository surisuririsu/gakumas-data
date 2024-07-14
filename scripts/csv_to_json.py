import argparse
import csv
import json

parser = argparse.ArgumentParser("python -m scripts.csv_to_json")
parser.add_argument("type", help="The type of item to process", choices=["p_items"])
args = parser.parse_args()

data = []

with open(f"csv/{args.type}.csv", encoding="utf-8") as f:
  csv_reader = csv.DictReader(f)
  for row in csv_reader:
    data.append(row)

with open(f"json/{args.type}.json", "w", encoding="utf-8") as f:
  f.write(json.dumps(data, indent=2))
