console.log('Before');
const promiseGetUser = getUser(1);
var promiseGetRepos;
console.log('After');

promiseGetUser.then((result) => {
        console.log('Result: ', result)
        promiseGetRepos = getRepositories(result.gitHubName);
        promiseGetRepos.then(result => console.log(result));
    })
    .catch(err => console.log('Error: ', err.message));



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
    const p = new Promise((resolved, reject) => {
        setTimeout(() => {
            console.log('Reading repositories...', userName);
            const repos = ['repo1', 'repo2', 'repo3'];
            resolved(repos);
        }, 2000);
    });
    return p;
}