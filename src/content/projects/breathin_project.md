---
title: BreathIn, near-live air quality for Czech cities
summary: A web application and data pipeline that collects air-pollution measurements daily and tells residents how their city compares with its own history.
date: 2022-03-29
tags: [django, postgresql, postgis, data-pipeline, air-quality]
repo: https://github.com/Denis-png/breathin
report: /bachelor_thesis.pdf
status: completed
featured: false
---

Bachelor thesis, Czech University of Life Sciences Prague, Environmental Data Science. Supervised by doc. Ing. Mgr. Ioannis Markonis, Ph.D.

## Problem

Air quality affects health directly, but the data behind it is spread across sources and hard to read. The aim was one simple page: pick a Czech city and see, for each pollutant, whether today's air is low, normal or high compared with that city's history, and how it is changing. Behind it, an automated pipeline had to collect and process the data without manual work.

## Approach

- **Data sources.** Historical measurements for 2013 to 2021 and daily near-live measurements, both from the European Environment Agency's download service, which republishes the Czech Hydrometeorological Institute's verified sensor data. The pollutants covered are CO, NO and NO2, SO2, O3, PM2.5 and PM10.
- **Locating the stations.** Region polygons from Google Earth Engine are stored in PostgreSQL with PostGIS. Each station's coordinates are matched to a region with the shapely library, so the pipeline picks up new stations without code changes.
- **Pipeline.** A scheduled job runs every night at 23:30 and downloads the last two days. A second step removes duplicates and computes daily averages. A third aggregates each completed month. A final step turns the numbers into a summary for the site.
- **The summary for each city and pollutant** has three parts: a low, normal or high label (the 20% and 60% quantiles of the historical monthly values), a trend over the last 30 days from a linear fit, and the number of days in the month above the EEA and WHO limits.
- **Web application.** Django, with a single page that lists the cities and then each pollutant's summary and a short note on its sources and health effects. Styling is plain CSS in the BEM convention.

## Results

- The application covers the major cities and towns of the Czech Republic and runs largely on its own.
- The historical analysis looked at the five most polluted cities for each pollutant group. NO2, PM2.5 and PM10 showed Czech air pollution most clearly, and Ostrava, Karviná and Olomouc appeared most often in those lists.
- Ozone was the only pollutant with an increasing annual trend. No strong SO2 or ozone pollution showed up in the historical data.

## What I'd do differently

- The 20% and 60% thresholds were chosen by looking at the resulting values, not validated against anything. They would need a proper justification, or a standard such as health-based limits.
- A new sensor is classified against its own history, so it gets no label for a year.
- There are no automated tests, only scratch scripts, and the pipeline's stages are run as separate scripts. A rework would add tests and make each stage easy to run and check on its own.

That rework has started as [breathin_v2](/projects/breathin_v2_project/).

## How to run it

The code is kept as it was submitted. It needs a Django environment, PostgreSQL with PostGIS, and a `.env` file with the database settings. The collection scripts are in `BreathIn_python/`, and the thesis describes the whole design.
