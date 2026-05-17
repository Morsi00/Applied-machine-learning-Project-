# 📊 Customer Segmentation & Churn Risk Analysis

![Project Banner](https://private-us-east-1.manuscdn.com/sessionFile/UR9EK5O09Wt6Hu0Z9QKQoO/sandbox/wW3SZdjYNrUD0fVE53lU6a-images_1778918908439_na1fn_L2hvbWUvdWJ1bnR1L3Byb2plY3RfYmFubmVy.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVVI5RUs1TzA5V3Q2SHUwWjlRS1FvTy9zYW5kYm94L3dXM1NaZGpZTnJVRDBmVkU1M2xVNmEtaW1hZ2VzXzE3Nzg5MTg5MDg0MzlfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwzQnliMnBsWTNSZlltRnVibVZ5LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=FP9cvOPieTlio3p~aJWDLBYT1flVMQYqul7-kQYyLC52Wl21CNyRzAmbKoxGk3yHi1PFm4bjYEABAHzG332t2wg4g0ki3WETxkIxAsPuaxGrYmZRGgJcXPCAviqNv0fcvxR5X6dLcssOVGTQudDjFd~dS3-udlbFBkpCpfqUueBtuUjZ~ss7bnjKBxZjDPCAxp3uTOYs6F57Q3rHik8FBK6RANMi1kYWuBCJ9P5yrp37z7DrsGkHlwhOLMFBxZBhRsSjjl6wybeI~33CxQchEXRa6bEGomJeTO6CfoNL8i88PMlaOKz6mhnGbusk1BATpVzzUfekvc1Tleo0idqLsg__)

## 🚀 Project Overview

In the competitive telecommunications industry, retaining customers is as vital as acquiring new ones. This project implements an advanced **Customer Segmentation and Churn Risk Analysis** pipeline. By leveraging a variety of machine learning techniques—ranging from traditional clustering to neural network-based representations—we aim to identify distinct customer personas and predict their likelihood of leaving the service.

### 🎯 Objectives
- **Data Engineering**: Transform raw telecommunications data into a high-quality, encoded feature set.
- **Segmentation**: Group customers into meaningful clusters based on behavior and demographics.
- **Anomaly Detection**: Identify "outlier" customers who exhibit unique patterns, often representing high-value or high-risk individuals.
- **Actionable Insights**: Provide the retention team with clear priorities to minimize churn.

---

## 📂 Dataset Description

The project uses the **Telco Customer Churn** dataset, which provides a 360-degree view of customer interactions.

### Data Categories
| Category | Features |
| :--- | :--- |
| **Demographics** | Gender, Senior Citizen status|
| **Services** | Phone, Multiple Lines, Internet (DSL/Fiber), Online Security, Backup, Protection, Tech Support, Streaming TV/Movies |
| **Account Info** | Tenure, Contract type, Paperless Billing, Payment Method, Monthly Charges, Total Charges |
| **Target** | **Churn** (Yes/No) |

---

## 🛠️ Technical Pipeline & Algorithms

Our approach combines multiple sophisticated algorithms to ensure robust analysis:

### 1. Data Preprocessing & UI
- **Lead**: **Ahmed Morsi**
- **Process**: Comprehensive data cleaning, handling missing values (specifically for new customers with zero tenure), and feature encoding. Ahmed also spearheaded the development of the system's user interface to make the insights accessible.

### 2. K-Means Clustering
- **Lead**: **Ibrahim Mohamed**
- **Process**: Applied the **K-Means** algorithm to partition the customer base into homogeneous groups. This helps in understanding the "average" behavior within different segments.

### 3. Density-Based Clustering (DBSCAN)
- **Lead**: **Elsayed Abdelsamea**
- **Process**: Utilized **DBSCAN** to identify clusters based on data density. This is particularly effective for discovering clusters of arbitrary shapes and, crucially, identifying **Outliers** (noise) in the data.

### 4. Self-Organizing Maps (SOM)
- **Lead**: **Mohamed Hatem** (Team Leader)
- **Process**: Implemented **SOM**, a type of Artificial Neural Network, to produce a low-dimensional (typically two-dimensional), discretized representation of the input space. This allows for powerful visualization of high-dimensional customer data.

### 5. Graph Autoencoder (GAE)
- **Lead**: **Ahmed Karem**
- **Process**: Developed a **Graph Autoencoder** to learn latent representations of customers by considering them as nodes in a graph. This captures complex, non-linear relationships and structural dependencies between different customer profiles.

---

## 📈 Key Insights

Our analysis yielded several critical findings for the business:

> [!IMPORTANT]
> **Cluster 3** is the highest priority. 40-50% of customers in this group are at risk of churning.

- **VIP Identification**: Cluster 1 was identified as containing "Premium" customers. While they may not always show high churn risk, their unique behavior makes them high-value assets that require specialized maintenance.

---

## 💻 How to Run

### Prerequisites
- Python 3.8+
- Google Colab (Recommended) or Jupyter Notebook

### Installation
```bash
pip install kagglehub pandas numpy matplotlib seaborn scikit-learn minisom torch
```
```bash
run index.html 
```

### Execution
1. Clone this repository.
2. Open `Applied_ML_Project.ipynb` in your preferred environment.
3. Ensure you have Kaggle API credentials if running locally, or use the built-in `kagglehub` download in the notebook.
4. Run all cells sequentially to reproduce the analysis and visualizations.

---

## 👥 The Team

| Name | Primary Contribution |
| :--- |  :--- |
| **Mohamed Hatem (Team leader)** |  SOM Implementation |
| **Ahmed Morsi** |  Preprocessing, UI Development |
| **Ibrahim Mohamed** |  K-Means Clustering  |
| **Elsayed Abdelsamea** |  DBSCAN  |
| **Ahmed Karem** |  Graph Autoencoder  |

---

*This project was developed as part of the Applied Machine Learning course.*
