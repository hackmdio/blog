export const Banner = () => (
  <a href="https://hackmd.io/event" target="_blank" rel="noopener noreferrer">
    <div className="anniversary-events-banner">
      <h3>Special for you!</h3>
      <span>Try the full power of HackMD for 30 days</span>
    </div>

    <style jsx scoped>{`
      .anniversary-events-banner {
        background-image: url(/images/events/Event_ad_xs.png);
        background-size: cover;

        display: flex;
        flex-direction: column;
        gap: 52px;
        border: 1px solid #37ffc3;
        margin: 0 auto;
        text-align: center;
        justify-content: center;
        max-width: 688px;
        padding: 30px 16px;

        font-family: 'Press Start 2P', cursive;
      }

      @media (min-width: 640px) {
        .anniversary-events-banner {
          background-image: url(/images/events/Event_ad_lg.png);
          padding: 20px 16px;
        }
      }

      .anniversary-events-banner h3 {
        font-size: 13px;
        color: #37ffc3;
        margin: 0;
      }

      .anniversary-events-banner span {
        font-size: 15.5px;
        color: #fff504;
      }

      a {
        width: 100%;
        text-decoration: none;
        padding-left: 20px;
        padding-right: 20px;
      }

      a:hover {
        text-decoration: none;
      }

      a:focus {
        text-decoration: none;
      }
    `}</style>
  </a>
)
