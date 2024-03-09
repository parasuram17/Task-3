class DownloadCSV {
    downloadFile(csv, file) {
        let csv_file, download_link;
        csv_file = new Blob([csv], { type: "text/csv" });
        download_link = document.createElement('a');
        download_link.download = file;
        download_link.href = window.URL.createObjectURL(csv_file);
        download_link.style.display = "none";
        document.body.appendChild(download_link);
        download_link.click();
    }
}
export let downloadCSV = new DownloadCSV();
