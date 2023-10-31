async function getusers(){
    let user=document.getElementById('usersearch').value;
    let api_url=`https://api.github.com/users/${user}`;
    let request=await fetch(api_url);
    var data=await request.json();
    if(request){
        var t=`
        <div id="accpage">
        <div id="overview">
            <div id="profile" style="display:flex;flex-direction:column;justify-content:space-around;align-items:center;">  
                <a href='' id='repo_link'><img id="accicon" src="" ></a>
                <h1 id='username_result'>My account name</h1>
            </div>
            <div id="detwrap">
                <div class="repo" id="repo">Repositories</div>
                <div class="repo" id="followers">Followers</div>
                <div class="repo" id="following">Following</div>
            </div>
        </div>
        `;
        document.getElementById('content').innerHTML=t;
        document.getElementById('accicon').src=data.avatar_url;
        document.getElementById('username_result').innerHTML=data.login;
        document.getElementById('repo_link').href=data.html_url;
        let repos_request=await fetch(data.repos_url);
        var repos_data=await repos_request.json();
        document.getElementById('repo').innerHTML=`Repositories: ${repos_data.length}`;
        let followers_request=await fetch(data.followers_url);
        var followers_data=await followers_request.json();
        document.getElementById('followers').innerHTML=`Followers: ${followers_data.length}`;
        let following_request=await fetch(`${data.url}/following`);
        var following_data=await following_request.json();
        document.getElementById('following').innerHTML=`Following: ${following_data.length}`;
    }
}