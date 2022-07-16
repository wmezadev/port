import { getJSON, onSubmit, onTouch } from './utilities.js';

const handleSearch = async (event) => {
    event.preventDefault();
    try {
        const input = document.getElementById('search');
        const resp = await getJSON(`https://remotive.com/api/remote-jobs?search=${input.value}`);
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';
        resp.jobs.forEach(job => {
            const item = renderJobVacancy(job);
            searchResults.appendChild(item);
        });
        onTouch('.job-vacancy__save-button', (event) => {
            console.log(event.currentTarget.dataset.id)
        });
        console.log(resp);
    } catch (err) {
        console.error(err)
    }
}

const renderJobVacancy = (job) => {
    const article = document.createElement('article');
    article.setAttribute('class', "job-vacancy");
    article.innerHTML = `
        <div class="job-vacancy__image">
            <figure>
                <img src="${job.company_logo}" alt="placeholder"/>
                <figcaption>${job.company_name}</figcaption>
            </figure>
        </div>
        <div class="job-vacancy__content">
            <h2><a href="#!">${job.title} - ${job.candidate_required_location}</a></h2>
            <h3>${job.category} - ${job.job_type}</h3>
            <p>${job.salary}</p>
            <time datetime="${job.publication_date}">${job.publication_date}</time>
        </div>
        <button type="button" class="job-vacancy__save-button" data-id="${job.id}">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 20H17.1717L12.7072 15.5354C12.3166 15.1449 11.6835 15.1449 11.2929 15.5354L6.82843 20L5 20V7C5 5.34315 6.34315 4 8 4H16C17.6569 4 19 5.34314 19 7V20ZM17 7C17 6.44772 16.5523 6 16 6H8C7.44772 6 7 6.44772 7 7V17L9.87873 14.1212C11.0503 12.9497 12.9498 12.9497 14.1214 14.1212L17 16.9999V7Z" fill="currentColor" /></svg>
            <span>Save</span>
        </button>
    `;
    return article;
}

onSubmit('.search-form', handleSearch)
