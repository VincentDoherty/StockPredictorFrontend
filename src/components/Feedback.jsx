function Feedback() {
    return (
        <div>
            <h1>Feedback</h1>
            <form>
                <label htmlFor="feedback">Your Feedback:</label>
                <textarea id="feedback" name="feedback" required></textarea>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
}

export default Feedback;