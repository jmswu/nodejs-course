console.log('Before');

getUser(1)
    .then(user => getRepositories(user.gitHubName))
    .then(repo => getCommit(repo[0]))
    .then(commit => getCommit(commit))
    .catch(err => console.log('error: ', err.message));


console.log('After');

function getUser(id)
{
    return new Promise((resolved, reject) => {
        setTimeout(() => {
            console.log('Reading a user from database...');
            resolved( {id: id, gitHubName: 'James'} );
        }, 1000);
    });
}

function getRepositories(userName)
{
    return new Promise((resolved, reject) => {
        setTimeout(() => {
            console.log('Reading repositories...', userName);
            const repos = ['repo1', 'repo2', 'repo3'];
            resolved(repos);
        }, 2000);
    });
}

function getCommit(commit)
{
    return new Promise((resolved, reject) => {
        setTimeout(() => {
            console.log('Reading commits...', commit);
            resolved(['commit1', 'commit2', 'commit3']);
        }, 2000);
    });
}