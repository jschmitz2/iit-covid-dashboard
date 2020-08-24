import gspread
import datetime
from dateutil.parser import parse

class Session:
    def __init__(self):
        self._refresh_creds()
        
        self._cases_time = datetime.datetime.now()

        self._refresh_case_data()
        self._refresh_weeks_data()


    def _refresh_creds(self):
        self.gc = gspread.service_account(filename="../_credentails/creds.json")
        self.worksheet = self.gc.open_by_key("1B0bI2sJdpdogdJ1Jz5XvMHN2pdXriw1InLbHfZbe210")
        self.cases_sheet = self.worksheet.sheet("cases")
        self.weeks_sheet = self.worksheet.sheet("weeks")
        return

    def _refresh_case_data(self):
        self.cases_data = self.cases_sheet.get_all_values()

    def _refresh_weeks_data(self):
        self.weeks_data = self.weeks_sheet.get_all_values()

    def get_case_data(self):
        if((datetime.datetime.now() - self._cases_time).seconds > 60*60*24):
            self._refresh_case_data()
        
        return self.cases_data
    
    def map_date_to_week(self, date):
        date = parse(date)
        for week, start_date, end_date in self.weeks_data:
            start_date, end_date = parse(start_date), parse(end_date)
            if((date-start_date).seconds >= 0) and ((end_date - date).seconds >= 0):
                return week
        else:
            raise ValueError("Not in the weeks!")
