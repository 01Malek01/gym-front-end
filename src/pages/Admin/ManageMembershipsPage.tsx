import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const ManageMembershipsPage = () => {
  // Dummy data until API integration
  const memberships = [
    { id: 1, name: "Premium", price: 99, duration: "1 Month", activeUsers: 45 },
    { id: 2, name: "Basic", price: 49, duration: "1 Month", activeUsers: 32 },
    { id: 3, name: "Annual", price: 899, duration: "1 Year", activeUsers: 12 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Memberships</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Active Users</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memberships.map((membership) => (
            <TableRow key={membership.id}>
              <TableCell>{membership.name}</TableCell>
              <TableCell>${membership.price}</TableCell>
              <TableCell>{membership.duration}</TableCell>
              <TableCell>{membership.activeUsers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageMembershipsPage;
