# E_G-16_Blinkit-Sales-Analysis

Blinkit sales, operations, and customer analytics project with a complete notebook workflow for ETL, EDA, statistical testing, and dashboard-load preparation.

## 1) Project Goal

This project builds a decision-ready analytics dataset and analysis layer for Blinkit so business users can evaluate:
- order and revenue trends,
- delivery performance and delay behavior,
- customer segment behavior,
- category and area-level performance,
- KPI health for dashboard reporting.

The final design follows this flow:
`Raw Sources -> Cleaning/ETL -> Curated Dataset -> EDA -> Statistical Validation -> Dashboard Load Files`

## 2) Current Repository Layout

### Root
- `README.md`: Detailed project documentation and run guide.
- `etl_log_blinkit_updated.docx`: Narrative ETL log and processing reference.

### `data/raw/` (source-of-truth, do not edit in place)
- `blinkit_customer_feedback.csv`
- `blinkit_customers.csv`
- `blinkit_delivery_performance.csv`
- `blinkit_inventory.csv`
- `blinkit_inventory_new.csv`
- `blinkit_marketing_performance.csv`
- `blinkit_order_items.csv`
- `blinkit_orders.csv`
- `blinkit_products.csv`
- `category_icons.xlsx`
- `Rating_Icon.xlsx`

### `data/processed/`
- `blinkit_cleaned_dashboard_data.csv`: Canonical cleaned dataset consumed by all analysis notebooks.

### `notebooks/`
- `02_cleaning.ipynb`: ETL and feature engineering.
- `03_eda.ipynb`: Exploratory analysis with trend/distribution/outlier views.
- `04_statistical_analysis.ipynb`: Correlation, regression, and hypothesis tests.
- `05_final_load_prep.ipynb`: KPI table + dashboard-ready extracts.

## 3) Dataset Roles (High Level)

- Orders: transaction-level values and order timestamps.
- Order Items: line-item product, quantity, and unit-price details.
- Products: product/category/brand and pricing attributes.
- Customers: profile, segment, and geography information.
- Delivery Performance: promised vs actual delivery times and delay information.
- Feedback: rating/sentiment/feedback tags.
- Marketing and Inventory: supporting operational/business context (explored separately in ETL notes).

## 4) Notebook-by-Notebook Details

### `02_cleaning.ipynb` (ETL + Feature Engineering)

Main responsibilities:
1. Load all raw files into independent DataFrames.
2. Standardize column naming style (`lowercase_with_underscores`).
3. Remove duplicate rows across source tables.
4. Handle missing values (for example, delay reason defaults).
5. Convert datetime columns used for time-based features.
6. Engineer pre-merge features (`total_price`, `hour`, `day`, `month`, `weekday`, `is_delayed`, `delay_minutes`).
7. Merge sources into a unified master DataFrame using left joins.
8. Resolve post-merge duplicate columns and naming conflicts.
9. Compute advanced operational features:
	- `promised_duration_minutes`
	- `actual_duration_minutes`
	- `delivery_efficiency`
	- `delay_category` / `delay_bucket`
	- `order_value_bucket`
	- `order_size`
	- `is_peak`
10. Run validation checks (negative delays, price consistency, types, uniqueness).
11. Export final cleaned dataset.

Output target:
- Canonical cleaned dataset used by the rest of the project.

### `03_eda.ipynb` (Exploratory Data Analysis)

Main responsibilities:
1. Load cleaned dataset from `data/processed`.
2. Run structural profiling:
	- shape,
	- dtype inventory,
	- missing percentage,
	- descriptive stats.
3. Create order-level analytical view (deduplicate `order_id` to avoid double counting).
4. Build trend views:
	- monthly orders,
	- monthly revenue,
	- average order value over time,
	- weekday performance.
5. Plot distributions for core metrics:
	- `order_total`,
	- `actual_duration_minutes`,
	- `distance_km`,
	- `rating`.
6. Detect outliers using IQR and produce outlier summaries.
7. Produce business slices:
	- category performance,
	- customer segment performance.

Why this stage matters:
- It identifies trends, spread, anomalies, and segment behavior before inferential testing.

### `04_statistical_analysis.ipynb` (Inferential Layer)

Main responsibilities:
1. Load cleaned dataset and derive order-level view.
2. Compute correlation matrix across selected numeric business variables.
3. Fit linear regression for `order_total` with selected predictors.
4. Evaluate model fit (coefficients + $R^2$ + actual vs predicted scatter).
5. Run hypothesis tests when required columns exist:
	- Welch t-test: delayed vs non-delayed order value,
	- ANOVA: order value across customer segments,
	- Chi-square: payment method vs delay status.

Why this stage matters:
- It turns descriptive observations into statistically testable insights.

### `05_final_load_prep.ipynb` (KPI + Dashboard Tables)

Main responsibilities:
1. Load cleaned dataset and create order-level frame.
2. Compute key KPI set (orders, revenue, AOV, delay/on-time rates, durations, ratings, peak-hour share, active customers).
3. Build final dashboard tables:
	- order-level final table,
	- category summary table,
	- area summary table.
4. Export files to `data/processed/`.

Generated files when notebook is executed:
- `blinkit_kpis.csv`
- `tableau_final_orders.csv`
- `tableau_final_category_summary.csv`
- `tableau_final_area_summary.csv`

## 5) Current Cleanup State

Repository was intentionally cleaned to reduce clutter:
- kept only canonical cleaned file in `data/processed/` (`blinkit_cleaned_dashboard_data.csv`),
- removed generated dashboard extracts (they are reproducible by running `05_final_load_prep.ipynb`),
- removed local virtual environments from project folder (`.venv`, `.venv-1`, `.venv-2`, `.venv-3`).

## 6) Naming Normalization Applied

- `FINAL(3)_CLEANED_DASHBOARD_DATA (1).csv` -> `data/processed/blinkit_cleaned_dashboard_data.csv`
- `data/raw/blinkit_orders (1).csv` -> `data/raw/blinkit_orders.csv`
- `data/raw/Category_Icons (1).xlsx` -> `data/raw/category_icons.xlsx`
- `data/raw/blinkit_inventoryNew.csv` -> `data/raw/blinkit_inventory_new.csv`
- `ETL_Log_Blinkit_Updated.docx` -> `etl_log_blinkit_updated.docx`

## 7) Reproducible Run Order

Use this order for complete regeneration of analysis artifacts:
1. Run `notebooks/02_cleaning.ipynb`.
2. Run `notebooks/03_eda.ipynb`.
3. Run `notebooks/04_statistical_analysis.ipynb`.
4. Run `notebooks/05_final_load_prep.ipynb`.

## 8) Data Governance Rules

- Never edit files directly in `data/raw/`.
- Treat `data/processed/blinkit_cleaned_dashboard_data.csv` as canonical curated output.
- Treat KPI/Tableau exports as reproducible derivatives.
- Keep logic changes in notebooks with clear markdown explanations.

## 9) Notes for Review and Viva

- Project uses both line-item and order-level views intentionally.
- Order-level deduplication is critical for trend and inferential correctness.
- Delay and duration metrics are engineered from timestamp differences.
- Statistical tests are conditionally executed based on column presence and SciPy availability.

