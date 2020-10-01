import React from 'react';
import './styles.css';

function LandingPage() {
  return (
    <>
      <div className="app">
        <section>
          <div className="banner">
            <img
              src={require('./images/banner.png')}
              alt="banner"
              className="banner"
              style={{ width: '100%' }}
            />
            <p>TestTestTestTestTestTestTestTestTestTest</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
