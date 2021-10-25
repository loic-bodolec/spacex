import { useQuery, gql } from "@apollo/client";
import "./App.css";

const GET_LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 12) {
      mission_name
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
        article_link
      }
      details
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="App">
      {data.launches.map((launch) => (
        <div className="launch-card">
          <h2 className="launch-title">{launch.mission_name}</h2>
          <p className="launch-date">{launch.launch_date_utc}</p>  
          <p className="launch-video-link"><a
              href={launch.links.video_link}
              rel="noopener noreferrer"
              target="_blank"
            >
              video link
            </a></p>
            <p className="launch-article-link"><a
              href={launch.links.article_link}
              rel="noopener noreferrer"
              target="_blank"
            >
              article link
            </a></p>
            <p className="launch-details">{launch.details}</p>
        </div>
      ))}
    </div>
  );
}

export default App;