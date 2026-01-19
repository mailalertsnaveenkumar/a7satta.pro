import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FAQ from "./assets/components/faq";
import Readmore from "./assets/components/Readmore";
import Clock from "./pages/clock";
import api from "./utils/api";
import LiveGameResult from "./pages/LiveGameResult";
import GroupTable from "./pages/GroupTable";
import MonthlyGroupTable from "./pages/MonthlyGroupTable";
import CustomAds from "./pages/CustomAds";
import BottomAds from "./pages/BottomPromotion";

import Luckynumber from "./assets/components/Luckynumber";
import MiddleAdsSection from "./pages/MiddleAdsSection";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();
	  const currentYear = new Date().getFullYear();
  const startYear = 2024;

  // Fetch games from backend
  useEffect(() => {
    let cancelled = false;
    const fetchGames = async () => {
      try {
        const res = await api.get("/games");
        if (cancelled) return;
        setGames(res.data);
        if (res.data.length > 0) setSelectedGame(res.data[0].name);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchGames();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCheck = () => {
  if (!selectedGame || !selectedYear) return;

  const gameSlug = selectedGame
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

navigate(`/chart-${selectedYear}/${gameSlug}-satta-king-result`);
};  

const UpcomingResults = ({ loadingInitial }) => {
  const [cards, setCards] = useState(
    new Array(3).fill(null).map(() => ({
      name: "",
      resultTime: "--",
      latestResult: null,
      minutesUntil: null,
      loading: true
    }))
  );

  const mountedRef = useRef(false);
  const intervalRef = useRef(null);
  const controllerRef = useRef(null);

  // Convert "18:30" -> "6:30 PM"
  const to12Hour = (timeStr) => {
    if (!timeStr || timeStr === "--") return "--";
    const [h, m] = timeStr.split(":");
    let hour = parseInt(h, 10);
    const minutes = parseInt(m, 10);

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const fetchOnce = async () => {
    try {
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      const r = await api.get("/upcoming?limit=5", {
        signal: controllerRef.current.signal
      });

      const data = r.data;
      if (!mountedRef.current) return;

      if (Array.isArray(data.cards)) {
        const mapped = data.cards.map((c) => ({
          name: c.name || "—",
          resultTime: c.resultTime ? to12Hour(c.resultTime) : "--",
          latestResult: c.latestResult ?? null,
          minutesUntil: c.minutesUntil ?? null,
          loading: false
        }));

        while (mapped.length < 3)
          mapped.push({
            name: "--",
            resultTime: "--",
            latestResult: null,
            minutesUntil: null,
            loading: false
          });

        setCards(mapped.slice(0, 3));
      } else {
        setCards(
          new Array(3).fill(null).map(() => ({
            name: "--",
            resultTime: "--",
            latestResult: null,
            minutesUntil: null,
            loading: false
          }))
        );
      }
    } catch (err) {
      if (err.name !== "CanceledError" && err.name !== "AbortError") {
        console.warn("Upcoming fetch failed", err);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchOnce();
    intervalRef.current = setInterval(fetchOnce, 30000);

    return () => {
      mountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  const Card = ({ card }) => {
    const showWaiting = !card.latestResult;

    return (
      <section className="circlebox2">
        <div>
          <div className="sattaname">
            <p style={{ margin: 0 }}>{card.name}</p>
          </div>

          <div className="sattaresult">
            <p style={{ margin: 0, padding: 0 }}>
              <span style={{ letterSpacing: 4 }}>
                {card.loading ? (
                  "--"
                ) : showWaiting ? (
                  <img
                    src="images/d.gif"
                    alt="wait icon"
                    height={50}
                    width={50}
                  />
                ) : (
                  card.latestResult
                )}
              </span>
            </p>

            <p
              style={{
                margin: 0,
                fontSize: 14,
                marginTop: 5,
                fontWeight: "bold"
              }}
            >
              <small style={{ color: "white" }}>{card.resultTime}</small>
            </p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      <Card card={cards[2]} />
      <Card card={cards[0]} />
      <Card card={cards[1]} />
    </div>
  );
};
  return (
    <div>
      <section className="circlebox">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="liveresult">
                <div id="clockbox">
                  <Clock />
                </div>
                <p className="hintext" style={{ padding: 0 }}>
                  हा भाई यही आती हे सबसे पहले खबर रूको और देखो
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- REPLACED GALI BLOCK ---------- */}
      <UpcomingResults games={games} loading={loading} />
      {/* ---------- end replaced block ---------- */}

      <LiveGameResult
        gameName="disawar"
        imgArrow="images/arrow.gif"
        imgWait="images/d.gif"
      />

      {/* <div
        style={{
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          margin: "0.5rem auto",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden",
          border: 0,
          borderRadius: "0.25rem",
        }} className="lucky-number-section"
      >
        <div className="rows">
          <div
            className="card-body notification munda"
            style={{
              display: "block",
              minHeight: 1,
              padding: "1.25rem",
              border: "1px dashed red",
              background: "#FFC107",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <div><h2><b>आज की पकड़ जोड़ी</b></h2></div>
				<Luckynumber />		
            
            
          </div>
        </div>
      </div> */}
{/*       
      <div
        style={{
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          margin: "0.5rem auto",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden",
          border: 0,
          borderRadius: "0.25rem",
        }}
      >
        <div className="rows">
          <div
            className="card-body notification munda "
            style={{
              flex: "1 1 auto",
              minHeight: 1,
              padding: "1.25rem",
              border: "1px dashed red",
              background: "#FFC107",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            <h2><b>मुंडा 01 से 100 नम्बरो तक की राशि/फैमिली</b></h2>
            <Link className="btnlink header_btn blck" to="/01-100-ki-family">
                    Check <span class="arw">→</span>
                </Link>
            
            
          </div>
        </div>
      </div> */}
      <CustomAds />

      <GroupTable groupName="gr1" />

      <GroupTable groupName="gr2" />
      <MiddleAdsSection/>  

      
		{/*<div
        style={{
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          margin: "0.5rem auto",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden",
          border: 0,
          borderRadius: "0.25rem",
        }}

        className="card-body notification munda blv-section"
      >
        <div className="rows" style={{width: "100%",}}>
          <div
            className="card-body notification"
            style={{
              flex: "1 1 auto",
              minHeight: 1,
              padding: "1.25rem",
              border: "1px dashed red",
              background: "#ffd800",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
             <h2>
              जिस व्यक्ति को तेज़ और विश्वसनीय परिणाम चाहिए, वे हमारे{" "}
              <Link to="https://whatsapp.com/channel/0029Vb6z44e17Ems4yyjTj0y">
                <strong> WhatsApp</strong>
              </Link>{" "} चैनल से जुड़ सकते हैं।
            </h2> 
          </div>
        </div>
      </div>*/}

      
      <section className="octoberresultchart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h5>SATTA RECORD CHART {new Date().getFullYear()}</h5>
            </div>
          </div>
        </div>
      </section>

      <div className="Select_selectMainDiv__QD2cf">
        <select
          aria-label="satta game name"
          className="Select_selectTag__IzyVd"
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
        >
          {games.map((game) => (
            <option key={game._id} value={game.name}>
              {game.name}
            </option>
          ))}
        </select>
        <select
          aria-label="year"
          className="Select_selectTag__IzyVd Select_secondTag__Q9uV_"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {Array.from(
            { length: currentYear - startYear + 1 },
            (_, i) => startYear + i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button className="header_btn" type="button" onClick={handleCheck}>
          Check <span className="arw">→</span>
        </button>
      </div>
      <section className="octoberresultchart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>
                <b>
                  SATTA RESULT CHART{" "}
                  {new Date()
                    .toLocaleString("en-US", { month: "long" })
                    .toUpperCase()}{" "}
                  {new Date().getFullYear()}
                </b>
              </h2>
            </div>
          </div>
        </div>
      </section>
      <MonthlyGroupTable groupName="gr1" />
      <MonthlyGroupTable groupName="gr2" />

            <BottomAds />

		<section className="game-detail">
        <div className="containers">
          <div className="rowr">
            <div className="col-left">
              <div className="text-left2">
                <h1>
                  Introducing the Satta King, the most popular Indian gaming culture and its social impact
                </h1>
              </div>
            </div>
            <div className="col-right">
              <div className="content">
                <p>
                  The most educational site about SATTA KING, A7 Satta is here! With this guide, you’ll have a full understanding of the Satta King game – from where it came from to how it’s played, which are the best markets and its importance for players to play safe.
                </p>
                <h2>Satta King: What is it?</h2>
                <p>
                  Winning in the game of Satta King is possible for you through online betting. It’s like a game of numbers, a kind of lottery or betting on the last two to four digits at the different timing intervals. <b>“King”</b> means head (winner) and <b>“Satta”</b> is usually association with betting or gambling.
                </p>

  

                <Readmore>
                  <p>
                    With different forms and regional pockets Satta King is now the most popular game even though it originally had its stock in the former lottery systems. It provides the pleasures of gambling and the promise of winning big, but you can’t lose much (if anything) if you don’t want to make large bets — all on a screen.
                  </p>

                  <h2>Satta King's Historical Background</h2>

                  <p>
                    Developed in mid-1900s, the Satta King game was invented. It originated from a game of <b>“Matka”</b> where people used to wager based on opening and closing rates of cotton transmitted from New York to Bombay Cotton Exchange. Introduction to Indian subcontinent The game was introduced to the India through many regional variations. Matka became very popular places like Delhi and Mumbai.
                  </p>

                  <p>
                    The game used to be played off line since late 1960’s, but after internet revolution in year 2000 every thing has become online and one can play this game digitally under Cyber Law termed as <b>“Satta”</b> King Possible. The game eventually fanned out to other towns and was associated with many markets — or <b>“bazaars”</b> — each with its own set of winning numbers and time.
                  </p>

                  <p>
                    In spite of prohibitions, Satta King is quite popular and the players constantly sit up for the winners to be declared each day. Since then, its spread to the internet in many locations — and that’s likely responsible for times you’ve been able to play more swiftly, or found results.
                  </p>

                  <h2>How Can I Play Satta King?</h2>
                  <p>
                    Satta King is super easy to play, but you need to be safe while playing it. This is a condensed explanation:
                  </p>

                  <h3>Selecting Numbers</h3>
                  <p>
                    One number between 00 and 99 is chosen by each student. PANNA Jodi pair Anak pannas are those numbers which are in pairs and taken in system such as tira/panna (A,B) 121 etc. For example-They can be played individually. But there are a bunch of bets for which the odds or payoff is pretty standard.
                  </p>

                  <h3>Making Bets</h3>
                  <p>
                    How to play: Players can bet on numbers over the internet with apps or operators or their agents. <b>“If it comes through, one makes many times the money,”</b> despite hardly any wager at stake — 10 or 50 in this case.
                  </p>

                  <h3>Declaring Outcomes</h3>
                  <p>
                    Each and every Satta market has its specific opening time result,which gets disclosed daily or weekly on a fixed time. Results of Delhi Bazar are declared at a fixed time and results of Disawar, Faridabad announce on a particular schedule.
                  </p>

                  <h3>Payouts and Wins</h3>
                  <p>
                    The player wins if the number selected is identical to the winning number stated for that particular draw. On which market, and on what type of bet, payouts can range from 90 to 960 times the original wager or more.
                  </p>

                  <h3>Famous Satta King Markets There are some popular Satta King Markets</h3>
                  <p>
                    There are many markets for gambling in the Indian subcontinent and Satta King is not a single game. All the markets will use different drawings, schedules, rules and results. These are some of the most popular markets:
                  </p>

                  <p>
                    <b>Delhi Bazar Satta:</b> Its an oldest and one of the most popular market that is having daily result.
                  </p>
                  <p>
                    <b>Disawar Satta:</b> It is famous for its daily draws as well and has a lot of players.
                  </p>
                  <p>
                    <b>Faridabad Satta:</b> A newly emerging market that is gaining popularity.
                  </p>
                  <p>
                    <b>Ghaziabad Satta:</b> Popular for player interaction and up-to-date results.
                  </p>
                  <p>
                    <b>Gali Satta:</b> This market is known to have a separate draw timing.
                  </p>
                  <p>
                    All these market uses their own web site or portal where players can check results of Togel. They can also follow websites or applications such as A7 Satta to get live results.
                  </p>

                  <h3>Recognizing the Dangers and Warnings</h3>
                  <p>
                    Satta King is dangerous, but it can be fun and rewarding too:
                  </p>
                  <p><b>Risk of loss:</b> Because the house always wins, players who take risks lose cash. If you gamble, though, your bottom line should be what you can afford to lose.</p>
					<p><b>Addictive:</b> The rapid nature of games and the possibility of big wins may lead to an addiction.</p>
					<p><b>Legal FAQs:</b> Whether playing Satta King is legal or not, it may lead to severe legal consequences as the games are still illegal in most parts of India.</p>
					<p><b>Trust issues:</b> DPL is largely played unofficially or underground so players should guard against fraudsters and scam sites.</p>
                  <p>
                    Tweet At A7 Satta: we provide proven fruits and lessons; we don't back or recommend to play challenge.
                  </p>

                  <h3>Platforms like A7 Satta's Function</h3>
                  <p>A7 Satta, and the like are important because there.visitInsnThis is give-and-take of digital.</p>
                  <p>
                    <b>Verified Results:</b> In order to reduce false information, the results of all lottery draw are posted directly after each announcement.
                  </p>
                  <p>
                    <b>Historical Data:</b> Historical Past of The Secret Powerball Technique Also this technique gives you a historical pasts a reuse of all the past winning results in thirteen years and shows the frequent drawing trend which has been happening for 8 years.
                  </p>
                  <p>
                    <b>Live Push Notifications:</b> You don’t ever need to worry about missing a tennis point, game or set with - push notifications being sent in real time.
                  </p>
                  <p>
                    <b>Player Education:</b> Offering counsel, strategies and resources about responsible gaming so that the players can make smart decisions.

                  </p>
                  <p>
                    <b>Privacy & Safety Ensured:</b> All user data is kept private and protected from any misuse.
                  </p>

                  <h3>Tips for Responsible Engagement</h3>
                  <p>
                    Never bet more than you can afford.
                  </p>
                  <p>Never attempt to fill up a vacuum.</p>
                  <p>
                    <b>Breaks:</b> Occasional time away from the game can help.
                  </p>
                  <p>— If you feel that you might be addicted to gambling, seek help.</p>
                  <p>
                    Know and obey the local gambling laws.
                  </p>

                  <h3>In conclusion</h3>
                  <p>
                    Satta King for common people of India. It may be entertaining and potentially rewarding, but always play responsibly, smartly, and calmly. ABOUT US The leading satta company in India, A7 Satta is run and maintained for 40 years.
                  </p>

                  <p>
                    To clarify, gaming can’t be your full-time job or investment. In summary: Always play safe, stay informed and only go to trusted sites for Satta King.
                  </p>
                </Readmore>
              </div>
            </div>
          </div>
        </div>
      </section>       

		<FAQ />
    </div>
  );
};

export default Home;








