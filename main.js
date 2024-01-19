async function fetchGitHubData() {
    resetFields();

    const usernameInput = document.getElementById('usernameInput');
    const profileName = document.getElementById('profileName');
    const bio = document.getElementById('bio');
    const followersElement = document.getElementById('followers');
    const locationElement = document.getElementById('location');
    const companyElement = document.getElementById('company');
    const emailElement = document.getElementById('email');
    const blogElement = document.getElementById('blog');
    const public_reposElement = document.getElementById('public_repos');
    const usernameInputValue = usernameInput.value.trim();
    const username = usernameInputValue.startsWith('@') ? usernameInputValue.slice(1) : usernameInputValue;
    const picture = document.querySelector('.picture');
    const searchResultDiv = document.querySelector('.searchResult');
    
    // Remove a div de erro, se existir
    removeErrorDiv();

    if (!username) {
        alert('Por favor, digite um nome de usuário do GitHub.');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error(`Usuário não encontrado. Verifique o nome de usuário e tente novamente. (Status: ${response.status})`);
        }

        const userData = await response.json();

        searchResultDiv.style.display = 'flex';

        profileName.textContent = userData.name || username;
        bio.textContent = userData.bio;

        const followersImg = document.createElement('img');
        followersImg.src = './assets/followers.svg';
        followersElement.appendChild(followersImg);
        followersElement.appendChild(document.createTextNode(` ${userData.followers} Seguidores • ${userData.following} Seguindo`));

        const avatarUrl = userData.avatar_url;
        const avatarImg = document.createElement('img');
        avatarImg.src = avatarUrl;
        avatarImg.alt = 'Foto do Usuário';

        // Cria o link (<a>) apenas para a imagem
        const profileLink = document.createElement('a');
        profileLink.href = userData.html_url;
        profileLink.target = '_blank';
        profileLink.appendChild(avatarImg);

        picture.appendChild(profileLink);

        const location = userData.location;
        const company = userData.company;
        const public_repos = userData.public_repos;
        const email = userData.email;
        const blog = userData.blog;

        if (location) {
            const locationImg = document.createElement('img');
            locationImg.src = './assets/location.svg';
            locationElement.appendChild(locationImg);
            locationElement.appendChild(document.createTextNode(` ${location}`));
        }

        if (company) {
            const companyImg = document.createElement('img');
            companyImg.src = './assets/company.svg';
            companyElement.appendChild(companyImg);
            companyElement.appendChild(document.createTextNode(` ${company}`));
        }

        if (public_repos) {
            const public_reposImg = document.createElement('img');
            public_reposImg.src = './assets/public_repos.svg';
            public_reposElement.appendChild(public_reposImg);
            public_reposElement.appendChild(document.createTextNode(` ${public_repos} repositórios`));
        }

        if (email) {
            const emailImg = document.createElement('img');
            emailImg.src = './assets/email.svg';
            emailElement.appendChild(emailImg);
            emailElement.appendChild(document.createTextNode(` ${email}`));
        }

        if (blog) {
            const blogImg = document.createElement('img');
            blogImg.src = './assets/blog.svg';
            blogElement.appendChild(blogImg);
            blogElement.appendChild(document.createTextNode(` ${blog}`));
        }

    } catch (error) {
        addErrorDiv(error.message);
    }
}

function resetFields() { // Função para limpar os campos
    const elementsToClear = ['profileName', 'bio', 'followers', 'location', 'company', 'public_repos', 'email', 'blog'];
    elementsToClear.forEach((elementId) => {
        const element = document.getElementById(elementId);
        element.innerHTML = '';
    });

    const pictureElement = document.querySelector('.picture');
    pictureElement.innerHTML = '';
    document.querySelector('.searchResult').style.display = 'none';
}

function addErrorDiv(errorMessage) { // Função para exibir mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'errorMessage';
    errorDiv.textContent = "O usuário não foi encontrado, por favor verifique.";

    const searchResultDiv = document.querySelector('.searchResult');
    searchResultDiv.insertAdjacentElement('afterend', errorDiv);
}

function removeErrorDiv() {
    const existingErrorDiv = document.querySelector('.errorMessage');
    if (existingErrorDiv) {
        existingErrorDiv.remove();
    }
}