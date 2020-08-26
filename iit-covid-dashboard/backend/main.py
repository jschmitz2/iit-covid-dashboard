from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import os
import image_gen
import sheet_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sheet_session = sheet_data.Session()

@app.get("/number_image/{value}/{width}")
async def getImage(value: int, width: str):
    return FileResponse(image_gen.gen_number_image(value, width))

@app.get("/data")
async def getData():
    # Return data: 
    student_population = []
    faculty_population = []
    ins_housing = []
    greek_housing = []

    output = {
        "student_population": student_population,
        "faculty_population": faculty_population,
        "ins_housing": ins_housing,
        "greek_housing": greek_housing
    }

    raw_data = sheet_session.get_case_data()
    
    cases = []
    for row in raw_data:
        cases.append({
            "date": row[0],
            "pop": row[1],
            "location": row[2],
            "cases_num": int(row[3]),
            "deaths_num": int(row[4])
        })

    # Get max week
    max_week = -1

    for case in cases:
        case["week"] = sheet_session.map_date_to_week(case["date"])
        case["start_date"], case["end_date"] = sheet_session.get_week_data(case["week"])

    # "Cases" now has appropriate data. 
    # 
    # Generate student population and faculty population tables.

    pop_output_map = {"STUDENT": student_population, "FACULTY": faculty_population}

    for pop_name, pop_output in pop_output_map.items():
        total_cases = 0
        total_deaths = 0

        max_week = -1
        for case in filter(lambda case: (case["pop"] == pop_name), cases):
            max_week = max(max_week, case["week"])

        for week_idx in range(max_week + 1):
            new_cases = 0
            new_deaths = 0

            case = None

            for case in filter(lambda case: (case["week"] == week_idx and case["pop"] == pop_name), cases):
                new_cases += case["cases_num"]
                new_deaths += case["deaths_num"]
        
            total_cases += new_cases
            total_deaths += new_deaths

            if case:
                week_obj = case.copy()

                week_obj["new_cases"], week_obj["new_deaths"] = new_cases, new_deaths
                week_obj["total_cases"], week_obj["total_deaths"] = total_cases, total_deaths
                week_obj["max_week"] = max_week

                pop_output.append(week_obj)
    

    locations = set()
    for case in cases:
        if len(case["location"]) > 3:
            locations.add(case["location"])

    INST_HOUSING = [
        "McCormick Student Village",
        "State Street Village",
        "Kacek Hall",
        "Gunsalus Hall",
        "Carmen Hall"
    ]

    GREEK_HOUSING = [
        "Phi Kappa Sigma",
        "Delta Tau Delta",
        "Alpha Sigma Alpha",
        "Kappa Phi Delta",
        "Pi Kappa Phi",
        "Triangle"
    ]

    for location in locations:
        if location in INST_HOUSING:
            output_map = ins_housing
        elif location in GREEK_HOUSING:
            output_map = greek_housing
        else:
            raise ValueError()

        max_week = -1
        for case in filter(lambda case: (case["location"] == location), cases):
            max_week = max(max_week, case["week"])
        
        loc_total_case = 0
        loc_total_death = 0

        for cur_week in range(max_week + 1):
            loc_week_case = 0
            loc_week_death = 0
            
            case = None

            for case in filter(lambda case: (case["location"] == location and case["week"] == cur_week), cases):
                loc_week_case += case["cases_num"]
                loc_week_death += case["deaths_num"]

            if not case:
                continue
            
            loc_total_case += loc_week_case
            loc_total_death += loc_week_death

            week_obj = case.copy()

            week_obj["new_cases"], week_obj["new_deaths"] = loc_week_case, loc_week_death
            week_obj["total_cases"], week_obj["total_deaths"] = loc_total_case, loc_total_death
            week_obj["max_week"] = max_week

            output_map.append(week_obj)

    return output




            


    



    

        
        

            
