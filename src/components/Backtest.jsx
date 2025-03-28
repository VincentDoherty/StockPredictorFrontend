function Backtest() {
    return (
        <div>
            <h1>Backtest</h1>
            <form>
                <label htmlFor="stock_symbol">Stock Symbol:</label>
                <input type="text" id="stock_symbol" name="stock_symbol" required />
                <label htmlFor="start_date">Start Date:</label>
                <input type="date" id="start_date" name="start_date" required />
                <label htmlFor="end_date">End Date:</label>
                <input type="date" id="end_date" name="end_date" required />
                <button type="submit">Run Backtest</button>
            </form>
        </div>
    );
}

export default Backtest;