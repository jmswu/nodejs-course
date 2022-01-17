console.log('Before');
getUser(1, (user) => {
    console.log("User: ", user);
    getRepositories(user, (repos) =>{
        console.log('Repos:', repos);
    })
});
console.log('After');

function getUser(id, callback)
{
    setTimeout(() => {
        console.log('Reading a user from database...');
        callback( {id: id, gitHubName: 'James'} );
    }, 1000);
}

function getRepositories(userName, callback)
{
    setTimeout(() => {
        console.log('Reading repositories...', userName);
        const repos = ['repo1', 'repo2', 'repo3'];
        callback(repos);
    }, 2000);
}