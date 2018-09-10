import notp from 'notp';
import base32 from 'thirty-two';

export default class TwoFactorAuth {
  /**
	 * @constructor
	 * @param {string} uniqueToken
	 * @param {string} userEmail
	 */
  constructor(uniqueToken, userEmail) {
    this.data = {
      email: userEmail,
      company: 'CheckoutHub'
    };
    this.data.secretkey = this.encode(uniqueToken);
  }

  /**
	 * Encode the value to Base32
	 * @param {string} value
	 * @returns {string}
	 */
  encode(value) {
    const encoded = base32.encode(value);
    // Google authenticator doesn't like equal signs
    const encodedForGoogle = encoded.toString().replace(/=/g, '');
    return encodedForGoogle;
  }

  /**
	 * TOTP key (Time-based One-Time Password)
	 * Generates an QR Image Src which contains the followin params,
	 * company, email, secretkey and issuer
	 * More info - https://github.com/google/google-authenticator/wiki/Key-Uri-Format
	 * @returns {string}
	 */
  get qrImgValue() {
    const { company, email, secretkey } = this.data;
    //let url = 'https://chart.googleapis.com/chart';
    //url += '?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/';
    // url += `${encodeURIComponent(company)}%3A`;
    // url += `${encodeURIComponent(email)}%3Fsecret%3D${secretkey}%26`;
    // url += `issuer%3D${encodeURIComponent(company)}`;
    let url = 'otpauth://totp/';
    url += `${company}:`;
    url += `${email}?secret=${secretkey}&`;
    url += `issuer=${company}`;
    return url;
  }
}

/**
 * Verifies the token entered by the user
 * @param {string} inputValue
 * @param {string} uniqueToken
 * @returns {boolean}
 */
export const verify = (inputValue, uniqueToken) => {
  const results = notp.totp.verify(inputValue, uniqueToken, {
    window: 5,
    counter: 10000
  });
  return !!(results && results.delta === 0);
};
