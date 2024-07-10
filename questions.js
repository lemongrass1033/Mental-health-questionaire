document.getElementById('assessmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const sections = ['kemurungan', 'kebimbangan', 'tekanan', 'ketakutan'];
    const meanScores = {};
    let allFilled = true;

    sections.forEach(section => {
        let total = 0;
        let count = 0;

        // Determine the number of questions for the current section
        const numberOfQuestions = (section === 'tekanan' || section === 'ketakutan') ? 3 : 6;

        for (let i = 1; i <= numberOfQuestions; i++) {
            const radios = document.querySelectorAll(`input[name=${section}${i}]:checked`);

            if (radios.length === 0) {
                allFilled = false;
                const firstRadio = document.querySelector(`input[name=${section}${i}]`);
                if (firstRadio) {
                    firstRadio.setCustomValidity('Please answer this question.');
                }
            } else {
                radios.forEach(radio => {
                    total += parseInt(radio.value);
                    count++;
                });
                radios[0].setCustomValidity('');
            }
        }

        const mean = (count > 0) ? (total / count).toFixed(2) : 0;
        meanScores[section] = mean;
    });

    if (allFilled) {
        // Show confirmation dialog before proceeding
        if (confirm("Are you sure you want to submit?")) {
            localStorage.setItem('meanScores', JSON.stringify(meanScores));
            window.location.href = 'suggestions.html'; // Redirect to suggestions page after successful submission
        }
    } else {
        document.getElementById('assessmentForm').reportValidity(); // Display native browser validation messages
    }
});
