export const formatDate = (inputDate: Date): string => {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${date}.${month}.${year}`;
}

export const parseRawDate = (inputDate: any): string => {
    const dateSeconds = Date.parse(inputDate)
    const dateFrom = new Date(dateSeconds);
    const date = formatDate(dateFrom)
    return date
}

export const parseViewsToString = (views?: number): string => {
    let viewsString = ''

    if(!views) {
        return `0 просмотров`
    }

    const split = (n: number) => {
        let splitted = views.toString().split("").slice(0, n).join("")
        return splitted
    }

    if (views === 0) {
        viewsString = `${views} просмотров`
    } else if (views === 1) {
        viewsString = `${views} просмотр`
    } else if (views > 1 && views <= 999) {
        viewsString = `${views} просмотров`
    } else if (views > 999 && views <= 9999) {
        const splitted = split(1)
        viewsString = `${splitted} тыс. просмотров`
    } else if (views > 9999 && views <= 99999) {
        const splitted = split(2)
        viewsString = `${splitted} тыс. просмотров`
    } else if (views > 99999 && views <= 999999) {
        const splitted = split(3)
        viewsString = `${splitted} тыс. просмотров`
    } else if (views > 999999 && views <= 9999999) {
        const splitted = split(1)
        viewsString = `${splitted} млн. просмотров`
    }

    return viewsString
}

export const parseSubsToString = (subs?: number): string => {
    let subsString = ''
    
    if(!subs) {
        return `0 подписчиков`
    }

    const split = (n: number) => {
        let splitted = subs.toString().split("").slice(0, n).join("")
        return splitted
    }

    if (subs === 0) {
        subsString = `${subs} подписчиков`
    } else if (subs === 1) {
        subsString = `${subs} подписчик`
    } else if (subs > 1 && subs <= 999) {
        subsString = `${subs} подписчиков`
    } else if (subs > 999 && subs <= 9999) {
        const splitted = split(1)
        subsString = `${splitted} тыс. подписчиков`
    } else if (subs > 9999 && subs <= 99999) {
        const splitted = split(2)
        subsString = `${splitted} тыс. подписчиков`
    } else if (subs > 99999 && subs <= 999999) {
        const splitted = split(3)
        subsString = `${splitted} тыс. подписчиков`
    } else if (subs > 999999 && subs <= 9999999) {
        const splitted = split(1)
        subsString = `${splitted} млн. подписчиков`
    }

    return subsString
}