import React, { memo, useEffect } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

const Phone = memo(({ phone, setPhone, setPhoneValid }) => {
  useEffect(() => {
    phone && setPhoneValid(isValidPhoneNumber(phone));
  }, [phone]);
  return (
    <PhoneInput
      international
      limitMaxLength
      countryCallingCodeEditable={false}
      defaultCountry="AM"
      value={phone}
      onChange={(e) => {
        setPhone(e);
      }}
      aria-label="Phone"
    />
  );
});

export default Phone;
