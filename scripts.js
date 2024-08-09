function parseLog() {
    const input = document.getElementById('logInput').value;
    const output = document.getElementById('logOutput');
    try {
        const logData = JSON.parse(input);
        
        // Extract and display parameters
        document.getElementById('request_id_value').innerText = logData.request_id || 'N/A';
        document.getElementById('user_value').innerText = (logData.request_body && JSON.parse(logData.request_body).user) || 'N/A';
        document.getElementById('type_value').innerText = logData.type || 'N/A';
        
        // Format and display the JSON log
        output.innerHTML = formatJSON(logData);
    } catch (e) {
        output.innerHTML = '<span style="color: red;">Invalid JSON</span>';
        // Clear parameters if invalid JSON
        document.getElementById('request_id_value').innerText = 'N/A';
        document.getElementById('user_value').innerText = 'N/A';
        document.getElementById('type_value').innerText = 'N/A';
    }
}

function formatJSON(obj, indent = 0) {
    if (typeof obj !== 'object' || obj === null) {
        return `<span class="value">${JSON.stringify(obj)}</span>`;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => formatJSON(item, indent)).join('<br>');
    }

    let result = '';
    for (const [key, value] of Object.entries(obj)) {
        result += `${'&nbsp;'.repeat(indent * 4)}<span class="key">"${key}":</span> ${formatJSON(value, indent + 1)}<br>`;
    }
    return result;
}