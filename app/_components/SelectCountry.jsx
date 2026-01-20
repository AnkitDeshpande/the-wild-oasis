import { getCountries } from "@/app/_lib/data-service";

// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();

  // 1. Determine the country name to use (provided prop or fallback to India)
  const selectedCountry = defaultCountry || "India";

  // 2. Find the flag for the selected country
  const flag =
    countries.find((country) => country.name === selectedCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      // 3. Set the encoded defaultValue
      defaultValue={`${selectedCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
