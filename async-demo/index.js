console.log('Before');
getUser(1, displayUser);
console.log('After');

function getUser(id, callback)
{
    setTimeout(() => {
        console.log('Reading a user from database...');
        callback( {id: id, gitHubName: 'James'} );
    }, 1000);
}

function displayUser(user)
{
    console.log('User: ', user);
    getRepositories(user, displayRepos);
}

function getRepositories(userName, callback)
{
    setTimeout(() => {
        console.log('Reading repositories...', userName);
        const repos = ['repo1', 'repo2', 'repo3'];
        callback(repos);
    }, 2000);
}

function displayRepos(repos)
{
    console.log('Repos: ', repos);
}