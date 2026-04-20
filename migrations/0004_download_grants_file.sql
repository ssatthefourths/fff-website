-- Each download_grant authorises one specific file for one order_item.
-- Without this column we can't tell which PDF a grant points at when a
-- product has more than one file.
ALTER TABLE download_grants ADD COLUMN product_file_id INTEGER REFERENCES product_files(id);

-- Prevent duplicate grants when the payment webhook retries. A given
-- (order_item, file) pair should only ever produce one active token.
CREATE UNIQUE INDEX IF NOT EXISTS idx_download_grants_item_file
  ON download_grants(order_item_id, product_file_id);
