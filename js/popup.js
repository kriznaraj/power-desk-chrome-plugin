jQuery(".btn-fetch-report").click(() => {
    let domain = jQuery.trim(jQuery("#pd-site-name").val() || "");
    chrome.storage.local.get("config", (config) => {
        let reportUrl = config.reportUrl || config.config.reportUrl;
        if (!reportUrl) {
            throw "Report url is not set";
        }
        getReportData(reportUrl, {
            domain,
        }).then((report) => {
            report = JSON.parse(report);
            new Tabulator("#report-data", {
                data: report.issues,
                columns: [
                    //define the table columns
                    { title: "Entity ID", field: "entityId" },
                    { title: "Error Message", field: "errorMessage" },
                ],
            });
            saveInLocalStorage("report", report);
        });
    });
});

async function runInOpenTab(func) {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id,
        },
        function: func,
    });
}

function saveInLocalStorage(key, value) {
    let data = {};
    data[key] = value;
    chrome.storage.local.set(data, function() {
        console.log("Saved in local storage");
        console.log(data);
    });
}

async function saveOpenSupportTicketNumber() {
    return await runInOpenTab(() => {
        let ticketNumber = jQuery.trim(
            jQuery(".header-primary__page-name .breadcrumb__item.active").text()
        );
        console, log("ticketNumber - " + ticketNumber);
        saveInLocalStorage("ticketInfo", {
            ticketNumber: ticketNumber,
            nonce: Math.random(),
        });
    });
}

function getReportData(reportUrl, param) {
    console.log(param);
    console.log(reportUrl);
    return fetch(reportUrl + param.domain)
        .then((r) => r.text())
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.error(err);
            return {};
        });
}

function loadReport() {
    console.log("showing report");
    chrome.storage.local.get("report", function(result) {
        console.log(result);
        if (result && result.report) {
            console.log("loadReport()");
            console.log(result.report.issues);
            new Tabulator("#report-data", {
                data: result.report.issues,
                columns: [
                    //define the table columns
                    { title: "Entity ID", field: "entityId" },
                    { title: "Error Message", field: "errorMessage" },
                ],
            });
        } else {
            jQuery("#report-data").text("No Data");
        }
    });
}
loadReport();