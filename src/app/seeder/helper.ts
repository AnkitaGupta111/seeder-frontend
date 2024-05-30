export function getGreeting(date: Date) {
    const currentHour = date.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        return "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
        return "Good Evening";
    } else {
        return "Good Night";
    }
}

export function getTotal(items: any, field: string, filter: any) {
    return items?.filter((con: any) => con[filter.name] == filter.value)?.reduce((accumulator: number, item: any) => {
        return accumulator + item[field];
    }, 0)
}

export function getMax(items: any, field: string, filter: any) {
    return items?.filter((con: any) => con[filter.name] == filter.value)?.reduce((max: number, item: any) => {
        return max < item[field] ? item[field] : max
    }, 0)
}