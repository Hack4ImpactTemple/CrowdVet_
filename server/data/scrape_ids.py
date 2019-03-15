import csv
from google import google
import sys

num_page = 3
search_results = google.search("This is my query", num_page)

print(search_results)

sys.exit(0)

with open('./DSE-Loan-Inquiry-Stage-I-.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')

    init_row = []
    k = 0
    for row in reader:
        if(k == 0):
            init_row = row
            k += 1
            continue
        i = 0
        for elem in row:
            print(i, end="\t")
            print(init_row[i])
            print(elem)
            print()

            i += 1
