import React from 'react';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <h1>Welcome to the Biryani World!</h1>
      <p>Explore the delightful flavors of biryanis from around the world.</p>
      <div className="biryani-images">
        
        <img src="https://imgs.search.brave.com/38tFpDz7XF_r2ebX_sRrMy5l0rrJCUhM-vngjCKAsto/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9waG90by12aWV3/LXRhc3R5LXl1bW15/LWRlbGljaW91cy1p/bmRpYW4tYmlyaXlh/bmktd2hpdGUtYmFj/a2dyb3VuZF8xMTI4/NjAzLTIyODcuanBn/P3NpemU9NjI2JmV4/dD1qcGc" alt="Biryani 1" />
        <img src="https://imgs.search.brave.com/a5YqJgwY3rrltI4njRU8UiZt8eX643clTkCpN9C2_Uw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/bGF0ZS1iaXJ5YW5p/LXdpdGgtYnVuY2gt/Zm9vZC1pdF81MDU3/NTEtMzgxOS5qcGc_/c2l6ZT02MjYmZXh0/PWpwZw" alt="Biryani 2" />
        <img src="https://imgs.search.brave.com/AVnj-btNqKOm1F2zLGbIlnMwyeUAoIvQu1F6X8359nI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdDIu/ZGVwb3NpdHBob3Rv/cy5jb20vNDkwMDU3/NjYvNDYzNzAvaS80/NTAvZGVwb3NpdHBo/b3Rvc180NjM3MDMz/MzAtc3RvY2stcGhv/dG8tZHVtLWNoaWNr/ZW4tYmlyaXlhbmkt/Y2xvc2UtaW1hZ2Uu/anBn" alt="Biryani 3" />
      </div>
    </div>
  );
}

export default Landing;