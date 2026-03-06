

let allIssues = [];

const loadIssue = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            displayIssue(allIssues);
        })
}

// "data": [
//     {
//       "id": 1,
//       "title": "Fix navigation menu on mobile devices",
//       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//       "status": "open",
//       "labels": [
//         "bug",
//         "help wanted"
//       ],
//       "priority": "high",
//       "author": "john_doe",
//       "assignee": "jane_smith",
//       "createdAt": "2024-01-15T10:30:00Z",
//       "updatedAt": "2024-01-15T10:30:00Z"
//     }
const displayIssueDetails = (issue) => {
    const IssueDetails =
        document.getElementById('issue-details')
    IssueDetails.innerHTML = `
    <div class="space-y-7 p-5 rounded-md">
                <h1 class="text-3xl font-bold">${issue.title}</h1>
            <div class="flex items-center gap-4">

            ${issue.status == 'open' ? `<button class="btn btn-success rounded-full"> ${issue.status}</button>`

            : `<button class="btn btn-error rounded-full"> ${issue.status}</button>`

        }

            <p>Opened by : ${issue.assignee}</p>
                <p>${new Date(issue.updatedAt).toLocaleDateString("en-US")}</p>
            </div>
            <div>
                ${issue.labels[0] ? `<p class="btn btn-error rounded-full">${issue.labels[0]}</p>` : `<p></p>`}

                ${issue.labels[1] ? `<p class="btn btn-warning rounded-full">${issue.labels[1]}</p>` : `<p></p>`}
            </div>
            <div>
                <p class="text-neutral-500">${issue.description}</p>
            </div>
            <div class="flex gap-35 bg-neutral-200 p-5 rounded-md">
                <div class="space-y-2">
                    <p class="text-neutral-500">Assignee:</p> 
                    <p class=" font-bold">${issue.assignee}</p>
                </div>
                <div class="space-y-2">
                    <p class="text-neutral-500">Priority:</p>

                     ${issue.priority == 'high'
                   ? `<p class="btn btn-active btn-error rounded-xl text-xl">${issue.priority}</p>`
                   : issue.priority == 'medium'
                   ? `<p class="btn btn-active btn-warning rounded-xl text-xl">${issue.priority}</p>`
                   : `<p class="btn btn-active rounded-xl text-xl">${issue.priority}</p>`}

                </div>
               
            </div>
            </div>
    
    
    `
    document.getElementById("my_modal_5").showModal();


}



const displayIssue = (issues) => {
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML = "";
    issues.forEach(issue => {
        const BannerParagraph = document.getElementById("banner-p")
        BannerParagraph.innerText = `${issues.length} Issues`

        const div = document.createElement('div');
        div.innerHTML = `
        <div onclick="my_modal_5.showModal()" class="card p-5 space-y-4 shadow-md border border-gray-300 border-t-4 cursor-pointer

        ${issue.status == 'open' ? 'border-t-green-500'
                : 'border-t-purple-500'} h-full">
        
                <div class="flex justify-between items-center ">
                 ${issue.status == 'open' ? `<img src="../assets/Open-Status.png" alt="">` : `<img src="../assets/Closed- Status .png" alt="">`
            }
                    

                 ${issue.priority == 'high'
                ? `<p class="btn btn-active btn-error rounded-xl text-xl">${issue.priority}</p>`
                : issue.priority == 'medium'
                    ? `<p class="btn btn-active btn-warning rounded-xl text-xl">${issue.priority}</p>`
                    : `<p class="btn btn-active rounded-xl text-xl">${issue.priority}</p>`}
            
                    
                </div>
                <div class="space-y-3">
                    <h1 class="font-bold text-2xl">${issue.title}</h1>
                    <p>${issue.description}</p>
                </div>
                <div>
                    ${issue.labels[0] ? `<p class="btn btn-error rounded-full">${issue.labels[0]}</p>` : `<p></p>`}

                    ${issue.labels[1] ? `<p class="btn btn-warning rounded-full">${issue.labels[1]}</p>` : `<p></p>`}
                </div>
                <hr>
                <div class="space-y-2">
                    <p class="text-neutral-500 ">#${issue.id} by ${issue.author}</p>
                    <p class="text-neutral-500">${new Date(issue.updatedAt).toLocaleDateString("en-US")}</p>
                </div>

            </div>
        `

        issueContainer.appendChild(div);
        div.addEventListener('click', () => displayIssueDetails(issue));



    });
}

const AllBtn = document.getElementById('all-btn');
const OpenBtn = document.getElementById('open-btn');
const ClosedBtn = document.getElementById('closed-btn');



AllBtn.addEventListener('click', () => {
    OpenBtn.classList.remove('active')
    ClosedBtn.classList.remove('active');
    AllBtn.classList.add('active')
    displayIssue(allIssues);
});

OpenBtn.addEventListener('click', () => {
    AllBtn.classList.remove('active');
    OpenBtn.classList.remove('active');
    OpenBtn.classList.add('active')
    const openIssues = allIssues.filter(issue => issue.status === 'open');
    displayIssue(openIssues);
});

ClosedBtn.addEventListener('click', () => {
    AllBtn.classList.remove('active');
    OpenBtn.classList.remove('active');
    ClosedBtn.classList.add('active')
    const closedIssues = allIssues.filter(issue => issue.status === 'closed');
    displayIssue(closedIssues);
});

loadIssue();