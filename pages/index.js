import React, { useState, useEffect } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

const githubAPI = 'https://api.github.com/users/danielalfb/followers';

function ProfileSidebar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />

      <p>
        <a
          className="boxLink"
          href={`https://github.com/${props.githubUser}.png`}
        >
          @{props.githubUser}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} <span className="boxLink">({props.items.length})</span>
      </h2>
      {/* <ul>
        {props.items.map((crr) => {
          const { id, login, html_url } = crr;
          return (
            <li key={id}>
              <a href={html_url}>
                <img src={`https://github.com/${login}.png`} />
                <span>{login}</span>
              </a>
            </li>
          );
        })}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const [followers, setFollowers] = React.useState([]);
  React.useEffect(() => {
    fetch(githubAPI)
      .then((res) => {
        return res.json();
      })
      .then((resFull) => {
        setFollowers(resFull);
      });
  }, []);

  const user = 'danielalfb';
  const [communities, setCommunities] = React.useState([
    {
      id: '07132021',
      title: 'Co&Ca',
      image: 'https://m.media-amazon.com/images/I/61TJ9b3IegL._AC_SL1500_.jpg',
      url: 'https://open.spotify.com/artist/3utxjLheHaVEd9bPjQRsy8',
    },
  ]);

  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vinda(o), {user}</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handlecommunitiesSubmit(e) {
                e.preventDefault();
                const formsData = new FormData(e.target);
                const community = {
                  id: new Date(),
                  title: formsData.get('title'),
                  image: formsData.get('image'),
                  url: formsData.get('link'),
                };

                const updatedCommunities = [...communities, community];
                setCommunities(updatedCommunities);
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa."
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa."
                />
              </div>
              <div>
                <input
                  placeholder="Qual a URL da sua comunidade?"
                  name="link"
                  aria-label="Qual a URL da sua comunidade?"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileConnectArea"
          style={{ gridArea: 'profileConnectArea' }}
        >
          <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Minhas comunidades</h2>
            <ul>
              {communities.map((result) => {
                const { id, title, image, url } = result;
                return (
                  <li key={id}>
                    <a href={url}>
                      <img src={image} />
                      <span>{title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
