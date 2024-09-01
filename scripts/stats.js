document.addEventListener('DOMContentLoaded', () => {
    const highestAttendanceCell = document.getElementById('highestAttendance');
    const lowestAttendanceCell = document.getElementById('lowestAttendance');
    const largestCapacityCell = document.getElementById('largestCapacity');
    const pastCategoriesTableBody = document.getElementById('pastCategories');
    const upcomingCategoriesTableBody = document.getElementById('upcomingCategories');
  
    fetch('https://aulamindhub.github.io/amazing-api/events.json')
        .then(response => response.json())
        .then(dataTables => {
            console.log(dataTables);
  
            const pastData = dataTables.events.filter(event => event.date <= dataTables.currentDate);
            const upcomingData = dataTables.events.filter(event => event.date > dataTables.currentDate);
  
            highestAttendanceCell.textContent = calculateMajor(pastData);
            lowestAttendanceCell.textContent = calculateMinor(pastData);
            largestCapacityCell.textContent = majorCapacity(pastData);
  
            populateCategoryStats(pastCategoriesTableBody, pastData, false);
            populateCategoryStats(upcomingCategoriesTableBody, upcomingData, true);
        });
  
    const calculateMajor = events => {
        let maxAttendance = 0;
        let eventTitle = "";
        events.forEach(event => {
            let attendancePercentage = (event.assistance / event.capacity) * 100;
            if (attendancePercentage > maxAttendance) {
                maxAttendance = attendancePercentage;
                eventTitle = event.name;
            }
        });
        return `${eventTitle} (${maxAttendance.toFixed(2)}%)`;
    };
  
    const calculateMinor = events => {
        let minAttendance = 100;
        let eventTitle = "";
        events.forEach(event => {
            let attendancePercentage = (event.assistance / event.capacity) * 100;
            if (attendancePercentage < minAttendance) {
                minAttendance = attendancePercentage;
                eventTitle = event.name;
            }
        });
        return `${eventTitle} (${minAttendance.toFixed(2)}%)`;
    };
  
    const majorCapacity = events => {
        let maxCapacity = 0;
        let eventTitle = "";
        events.forEach(event => {
            if (event.capacity > maxCapacity) {
                maxCapacity = event.capacity;
                eventTitle = event.name;
            }
        });
        return `${eventTitle} (${maxCapacity} capacity)`;
    };
  
    const populateCategoryStats = (tableBody, events, isUpcoming) => {
        const categoryStats = {};
  
        events.forEach(event => {
            const attendance = isUpcoming ? event.estimate : event.assistance;
  
            if (!categoryStats[event.category]) {
                categoryStats[event.category] = {
                    revenue: 0,
                    attendance: 0,
                    count: 0
                };
            }
  
            categoryStats[event.category].revenue += event.price * attendance;
          
            categoryStats[event.category].attendance += (attendance / event.capacity) * 100;
          
            categoryStats[event.category].count += 1;
        });
  
        Object.keys(categoryStats).forEach(category => {
            const averageAttendance = categoryStats[category].attendance / categoryStats[category].count;
            const row = `
                <tr>
                    <td>${category}</td>
                    <td>${categoryStats[category].revenue.toLocaleString('en', { style: 'currency', currency: 'USD' })}</td>
                    <td>${averageAttendance.toFixed(2)}%</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    };
  });