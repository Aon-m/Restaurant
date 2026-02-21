class DataFetcher {
  constructor(source) {
    this.source = source;
  }

  async fetchData() {
    if (typeof this.source === "string") {
      const response = await fetch(this.source);

      if (!response.ok) alert("Failed to retrieve data");

      const data = await response.json();

      return data;
    } else {
      return this.source;
    }
  }
}

export default DataFetcher;
