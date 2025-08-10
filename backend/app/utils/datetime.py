from datetime import datetime


def format_date_from_iso_format(date: datetime) -> str:
    dt = datetime.fromisoformat(str(date))
    formatted_date = dt.strftime("%d/%m/%Y, %H:%M:%S")

    return formatted_date
