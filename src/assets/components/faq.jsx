import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="containers">
        <div className="wrapper">
          <div className="text-center">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {/* FAQ 1 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 0 ? "active" : ""}`}
                onClick={() => toggleFAQ(0)}
              >
                <span className="sr">01.</span> Who is the founder of Satta King, and what does it include?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 0 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  Satta King is a kind of lottery game based on numbers from 00 to 99 which comes under <b>"Gambling"</b>. This game is actually called Satta Matka, meaning a pot from which a number is picked out and form of <b>“Satta”</b> or gambling. Banned by the state, it evolved haphazardly over decades into Satta, a form of lottery in which players try to guess the right numbers. It is a patchwork that bisects India into distinct regional markets — Delhi, Disawar, Gali and others — each with its own seasons and histories (some of which are understandable in terms of mental banking).
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 1 ? "active" : ""}`}
                onClick={() => toggleFAQ(1)}
              >
                <span className="sr">02.</span> Who is A7 Satta in the game of Satta King?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 1 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  A7 Satta is one of the best websites for genuine Satta King results, records chart, online bets and where to play satta betting on a secure platform. It provides services and support to gamers with real-time results etc, new draw alerts, safe gaming instructions, user data protection. Its solid reputation is attractive to both new and experienced gamblers seeking a site they can trust to deliver transparency.
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 2 ? "active" : ""}`}
                onClick={() => toggleFAQ(2)}
              >
                <span className="sr">03.</span> How do I play the Satta King using A7 Satta?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 2 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
To play, a player must make an account on A7 Satta or app and choose a market, then he must choose a number ranging from 00 to 99 and from there place his bets on multiple bet types (such as Single, Jodi, Panna). If the selected amount matches what has been announced on that markets & lands after draw.
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 3 ? "active" : ""}`}
                onClick={() => toggleFAQ(3)}
              >
                <span className="sr">04.</span> What are the main payout rates of Satta King bets?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 3 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
					Typical bet kinds include of:<br/>
				
                <b>Ank ( Single):</b> Bet on a single number between 0 and 9.  <br>
				<b>Jodi (Pair):</b> A pair is referred to as a gamble with two digits high or low (00-99), even used most for favorable payout.   <br>
				<b>Panna (Treble):</b> Bet on figures of 3 digit multiples.  <br>
				There are pay tables and side bets, however I am listing the most popular ones. Payouts may get as high as 90 to 960 times the bet, depending on the market and bet.
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 4 ? "active" : ""}`}
                onClick={() => toggleFAQ(4)}
              >
                <span className="sr">05.</span> How is it possible for a Satta king player to keep himself updated with Satta King bazar while checking the satta result?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 4 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  The official draw results were already published on the website of A7 Satta, who also immediately sponsored push alerts. Each market will have specific timing and an online results page. Gamblers can make use of past outcomes and algorithms to select their bet, but it is for them to pick news from trusted sources to avoid being conned.
                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 5 ? "active" : ""}`}
                onClick={() => toggleFAQ(5)}
              >
                <span className="sr">06.</span> What is the Laws and rules of Satta King India?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 5 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  It is considered to be illegal and a criminal offence in the states where the lottery is prohibited. There would be penalties or imprisonment in case of playing Satta betting, if conducted through approved agencies or lotteries. But just because playing Satta online is risky doesn’t mean that you can’t do it, since it is still technically legal; before participating in the activity, users or visitors must confirm that playing Online Satta is allowed in their region.

                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 6 ? "active" : ""}`}
                onClick={() => toggleFAQ(6)}
              >
                <span className="sr">07.</span> What are the dangers of playing Satta King online or offline?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 6 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  Important dangers consist of:<br/>
					<b>Money lost:</b> The house odds are high.<br/>
					<b>Addiction:</b> Games which are fast that promise high reward.. could worsen gambling addiction.<br/>
					<b>Liability:</b> Unlimited gambling is illegal.<br/>
					<b>Fake or cybersecurity:</b> Other websites appear on scam websites and they make no guarantee for the payments or data security. People must have trust in their privacy and safety when playing at sites, such as A7 Satta.
                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 7 ? "active" : ""}`}
                onClick={() => toggleFAQ(7)}
              >
                <span className="sr">08.</span> What are some of the methods to win Satta King?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 7 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
Players use historical charts and trends in past results tracking that A7 Satta of <b>“Secret Powerball Technique”</b> provides, to try to predict patterns of the numbers that will be drawn, but no method is foolproof. Such approaches can add an element of fun to your betting, but they have no effect on the odds. Gasportal also offers some key advice for people placing ethical bets, such as tips on avoiding losses and playing for fun over profit – something that’s stressed by leading providers.

                </div>
              </div>
            </div>
			
			<div className="container01">
              <div
                className={`question ${activeIndex === 8 ? "active" : ""}`}
                onClick={() => toggleFAQ(8)}
              >
                <span className="sr">09.</span> How is A7 Satta ensuring responsible gaming and safety of users?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 8 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
A7 Satta is focusses on the user privacy as we used encryption technique to privately verify the registered users & to manage personal data in more private. The platform regularly shares advice for setting boundaries, identifying risk factors, taking breaks and seeking help if there’s a possibility of becoming addicted to gambling. They also provide education on legal risk and referrals to support services if needed.

                </div>
              </div>
            </div>
			
			<div className="container01">
              <div
                className={`question ${activeIndex === 9 ? "active" : ""}`}
                onClick={() => toggleFAQ(9)}
              >
                <span className="sr">10.</span> How is A7 Satta different from other business partners like A1 Satta, A2 Satta, A3 Satta, A4 Satta, A7 Satta, A8 Satta, A9 Satta, B7 Satta and Lucky Satta?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 9 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
Being a trusted, reliable smart business in betting model, <b>A1 Satta, A2 Satta, A3 Satta, A4 Satta, A7 Satta, A8 Satta, A9 Satta</b> and <b>Lucky Satta</b> exchange their verified results, data analysis and players support with A7 Satta. Working together, they provide access to a large number of markets and increase the transparency of draw results and promote a culture of responsible betting. Together, they create cross-platform trust which means new markets and players.

                </div>
              </div>
            </div>


            {/* Add more FAQs below as needed */}
          </div>
        </div>
      </div>
    </section>
  );
}


