import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

const githubAPI = 'https://api.github.com/users/danielalfb/followers';

export async function getServerSideProps() {
  const res = await fetch(githubAPI);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

function ProfileSidebar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
    </Box>
  );
}

export default function Home({ data }) {
  let results = [];
  data.forEach((element) => {
    results.push(element);
  });
  results = results.slice(0, 6);

  const user = 'danielalfb';

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vinda(o), {user}</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div
          className="profileConnectArea"
          style={{ gridArea: 'profileConnectArea' }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas conexões{' '}
              <span className="boxLink">({results.length})</span>
            </h2>
            <ul>
              {results.map((result) => {
                const { id, login, html_url } = result;
                return (
                  <li>
                    <a href={html_url} key={id}>
                      <img src={`https://github.com/${login}.png`} />
                      <span>{login}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Minhas comunidades</h2>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
