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
    const username = usernameInput.value;
    const picture = document.querySelector('.picture');

    if (!username) {
        alert('Por favor, digite um nome de usuário do GitHub.');
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();

        document.querySelector('.searchResult').style.display = 'flex';

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
        console.error('Erro ao buscar dados do GitHub:', error);
        alert('Erro ao buscar dados do GitHub. Verifique o nome de usuário e tente novamente.');
    }
}



function resetFields() {
    // Limpa os campos de texto
    const elementsToClear = ['profileName', 'bio', 'followers', 'location', 'company', 'public_repos', 'email', 'blog'];
    elementsToClear.forEach((elementId) => {
        const element = document.getElementById(elementId);
        element.innerHTML = ''; // Limpa o conteúdo interno
    });

    // Limpa a .picture
    const pictureElement = document.querySelector('.picture');
    pictureElement.innerHTML = ''; // Limpa o conteúdo interno da .picture

    // Esconde a div de resultados após limpar os campos
    document.querySelector('.searchResult').style.display = 'none';
}