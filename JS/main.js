

let allIssues = [];

const loadIssue = () => {
    ManageSpinner(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            displayIssue(allIssues);
            ManageSpinner(false);
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

const ManageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issue-container").classList.add("hidden");
    }
    else {
        document.getElementById("issue-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
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
                 ${issue.status == 'open' ? `<img src="./assets/Open-Status.png" alt="">` : `<img src="./assets/Closed- Status .png" alt="">`
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
    ManageSpinner(true);
    OpenBtn.classList.remove('active')
    ClosedBtn.classList.remove('active');
    AllBtn.classList.add('active')
    setTimeout(() => {
        displayIssue(allIssues);
        ManageSpinner(false);
    }, 200);
});


OpenBtn.addEventListener('click', () => {
    ManageSpinner(true);
    AllBtn.classList.remove('active');
    OpenBtn.classList.remove('active');
    OpenBtn.classList.add('active')
    const openIssues = allIssues.filter(issue => issue.status === 'open');
    setTimeout(() => {
        displayIssue(openIssues);
        ManageSpinner(false);
    }, 200);
});

ClosedBtn.addEventListener('click', () => {
    ManageSpinner(true);
    AllBtn.classList.remove('active');
    OpenBtn.classList.remove('active');
    ClosedBtn.classList.add('active')
    const closedIssues = allIssues.filter(issue => issue.status === 'closed');
    setTimeout(() => {
        displayIssue(closedIssues);
        ManageSpinner(false);
    }, 200);
});

loadIssue();

document.getElementById('btn-srh').addEventListener('click', () => {
    AllBtn.classList.remove('active');
    OpenBtn.classList.remove('active');
    ClosedBtn.classList.remove('active');

    const Input = document.getElementById('input-srh');
    const searchValue = Input.value.trim();

    if (!searchValue) {
        displayIssue(allIssues);
        return;
    }

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then(res => res.json())
        .then((data) => {
            const BannerParagraph = document.getElementById("banner-p");
            
            if (data.data.length === 0) {
                const issueContainer = document.getElementById('issue-container');
                issueContainer.innerHTML = `
                    <div class="col-span-full flex flex-col items-center justify-center p-9 bg-red-200 rounded-md">
                        <img class="mx-auto" src="./assets/alert-error.png" alt="">
                        <h1 class="text-center text-2xl font-bold mt-4">No Issue Available</h1>
                    </div>
                `;
                BannerParagraph.innerText = `${data.data.length} Issues`;
            

            } else {
                displayIssue(data.data);
            }
        })
})