### Technical Task:

_Detecting Update Frequency of an External JSON File._

#### Objective:

Create a program to determine how often the file at
https://www.sec.gov/files/company_tickers_exchange.json is updated by monitoring
for changes over time.

#### Task Requirements:

1. Write a program in any language to download the file periodically (e.g.,
   every min, hour, day).
2. Implement at least two methods to confirm an update has occurred, even if the
   file content remains unchanged.
3. Recommended methods for detecting changes:

   - Content Comparison: Compare the JSON content from the previous download.
   - HTTP Headers: Check headers like Last-Modified or ETag.
   - File Metadata: Track file size, hash, or timestamp for differences.

4. Other detection methods are also acceptable.
