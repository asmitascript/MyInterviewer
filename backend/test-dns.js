import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

try {
  const result = await dns.promises.resolveSrv(
    "_mongodb._tcp.cluster0.bvebxsm.mongodb.net"
  );
  console.log(result);
} catch (error) {
  console.error(error);
}