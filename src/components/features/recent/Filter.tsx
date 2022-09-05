import Menu from "../../template/Menu";

const Filter = ({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange(value: string): void;
}) => {
  return (
    <Menu selected={selected} onChange={onChange}>
      <Menu.MenuItem to="/discover">Discover</Menu.MenuItem>
      <Menu.MenuItem to="/animation">Animation</Menu.MenuItem>
      <Menu.MenuItem to="/branding">Branding</Menu.MenuItem>
      <Menu.MenuItem to="/illustration">Illustration</Menu.MenuItem>
      <Menu.MenuItem to="/mobile">Mobile</Menu.MenuItem>
      <Menu.MenuItem to="/print">Print</Menu.MenuItem>
      <Menu.MenuItem to="/productDesign">ProductDesign</Menu.MenuItem>
      <Menu.MenuItem to="/typography">Typography</Menu.MenuItem>
      <Menu.MenuItem to="/web-design">Web Design</Menu.MenuItem>
    </Menu>
  );
};

export default Filter;
