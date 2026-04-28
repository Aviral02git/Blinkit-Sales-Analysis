
# Data Dictionary

## Overview

This data dictionary describes all variables used in the Blinkit Order Delivery Analysis project. It provides definitions, data types, and examples to ensure clarity and reproducibility of analysis.

---

## Dataset Columns

| Column Name               | Data Type | Description                                         | Example       |
| ------------------------- | --------- | --------------------------------------------------- | ------------- |
| order_id                  | String    | Unique identifier for each order                    | ORD10234      |
| customer_id               | String    | Unique ID for each customer                         | CUST567       |
| order_date                | Date      | Date when the order was placed                      | 2024-03-12    |
| order_total               | Float     | Total value of the order                            | 450.75        |
| payment_method            | String    | Mode of payment used                                | UPI           |
| delivery_partner_id       | String    | ID of delivery agent                                | DP123         |
| store_id                  | String    | Unique store identifier                             | STR45         |
| hour                      | Integer   | Hour of order placement (0–23)                      | 18            |
| day                       | Integer   | Day of the month                                    | 12            |
| month                     | Integer   | Month of the year                                   | 3             |
| weekday                   | String    | Day of the week                                     | Monday        |
| product_id                | String    | Unique product identifier                           | PRD890        |
| quantity                  | Integer   | Number of units ordered                             | 2             |
| unit_price                | Float     | Price per unit                                      | 50.00         |
| total_price               | Float     | Total price for the product (quantity × unit price) | 100.00        |
| product_name              | String    | Name of the product                                 | Milk          |
| category                  | String    | Product category                                    | Dairy         |
| brand                     | String    | Product brand                                       | Amul          |
| mrp                       | Float     | Maximum retail price                                | 55.00         |
| margin_percentage         | Float     | Profit margin percentage                            | 10%           |
| shelf_life_days           | Integer   | Product shelf life in days                          | 7             |
| min_stock_level           | Integer   | Minimum stock threshold                             | 10            |
| max_stock_level           | Integer   | Maximum stock capacity                              | 100           |
| area                      | String    | Delivery area name                                  | Rohini        |
| pincode                   | Integer   | Area postal code                                    | 110085        |
| registration_date         | Date      | Customer registration date                          | 2023-01-10    |
| customer_segment          | String    | Customer category (e.g., Regular, Premium)          | Premium       |
| total_orders              | Integer   | Total orders placed by customer                     | 25            |
| avg_order_value           | Float     | Average value per order                             | 320.50        |
| promised_time             | Time      | Expected delivery time                              | 18:30         |
| actual_time               | Time      | Actual delivery time                                | 18:50         |
| delivery_time_minutes     | Integer   | Total delivery time in minutes                      | 40            |
| distance_km               | Float     | Distance between store and customer                 | 5.2           |
| reasons_if_delayed        | String    | Reason for delay (if any)                           | Traffic       |
| is_delayed                | Boolean   | Whether order was delayed (1 = Yes, 0 = No)         | 1             |
| delay_minutes             | Integer   | Delay duration in minutes                           | 10            |
| feedback_id               | String    | Unique feedback identifier                          | FB102         |
| rating                    | Integer   | Customer rating (1–5)                               | 4             |
| feedback_text             | String    | Customer feedback comments                          | Late delivery |
| feedback_category         | String    | Type of feedback                                    | Delivery      |
| sentiment                 | String    | Sentiment derived from feedback                     | Negative      |
| feedback_date             | Date      | Date of feedback submission                         | 2024-03-12    |
| promised_duration_minutes | Integer   | Promised delivery duration                          | 30            |
| actual_duration_minutes   | Integer   | Actual delivery duration                            | 40            |
| delivery_efficiency       | Float     | Efficiency ratio (promised vs actual time)          | 0.75          |
| order_size                | String    | Size category of order (Small/Medium/Large)         | Medium        |
| is_peak                   | Boolean   | Whether order was during peak hours                 | 1             |
| delay_category            | String    | Type of delay (Minor/Major)                         | Minor         |
| delivery_status           | String    | Final delivery status                               | Delivered     |
| delay_bucket              | String    | Grouped delay range                                 | 0–10 min      |
| order_value_bucket        | String    | Bucketed order value                                | 200–500       |

---

## Key Notes

* Derived fields:

  * `total_price = quantity × unit_price`
  * `delivery_time_minutes` calculated from time difference
  * `delivery_efficiency = promised_duration / actual_duration`

* Boolean Encoding:

  * 1 = Yes / True
  * 0 = No / False

* Time-related features help in analyzing peak hours and delays

---

## Assumptions

* Missing values were handled during preprocessing
* All monetary values are in INR
* Time values follow 24-hour format

---

## Use Cases

This dataset supports:

* Delivery performance analysis
* Store and partner efficiency comparison
* Customer segmentation analysis
* Delay prediction and root cause analysis
* Feedback sentiment analysis

---
