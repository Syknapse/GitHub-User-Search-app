const input = document.getElementById('user-input');

input.addEventListener('keypress', function(event) {
  if(event.key === 'Enter'){
    this.blur();
  }
});

input.addEventListener('blur', function(event) {
  search();
  event.target.style.background = "";
});

input.addEventListener("focus", function(event) {
  event.target.style.background = "rgba(240,198,93,0.7)";
});

function search() {
  reset()
  fetch(`https://api.github.com/users/${input.value}`)
  .then(response => response.json())
  .then(json => {
    if (json.message == 'Not Found') {
      document.getElementById('username').innerText = 'User Not Found';
    } else {
        document.getElementById('username').innerText = json.login;
        document.getElementById('real-name').innerText = json.name;
        document.getElementById('avatar').setAttribute('src', json.avatar_url);
        document.getElementById('location').innerText = json.location;
        document.getElementById('bio').innerText = json.bio;
        document.getElementById('html-url').setAttribute('href', json.html_url);
        document.getElementById('followers').innerText = json.followers;
      }
    })
  fetch(`https://api.github.com/users/${input.value}/followers`)
  .then(response => response.json())
  .then(followers => {
    for (let i = 0; i < followers.length; i++) {
        const followersPanel = document.getElementById('followers-panel');
        let followerDetails = document.createElement('div');
        let followerLink = document.createElement('a');
        let followerName = document.createElement('p');
        let followerAvatar = document.createElement('img');

        followerName.innerText = followers[i].login;
        followerLink.setAttribute('href', followers[i].html_url);
        followerLink.setAttribute('target', '_blank');
        followerAvatar.setAttribute('src', followers[i].avatar_url);
        followersPanel.appendChild(followerDetails);
        followerDetails.appendChild(followerLink);
        followerLink.appendChild(followerName);
        followerLink.appendChild(followerAvatar);
    }
  })
}

function reset() {
  document.getElementById('followers-panel').innerText = '';
  document.getElementById('username').innerText = '';
  document.getElementById('real-name').innerText = '';
  document.getElementById('avatar').setAttribute('src', 'http://via.placeholder.com/462x462/B2FFC9?text=Find+a+GitHub+user');
  document.getElementById('location').innerText = '';
  document.getElementById('bio').innerText = '';
  document.getElementById('html-url').setAttribute('href', '');
  document.getElementById('followers').innerText = '';
}