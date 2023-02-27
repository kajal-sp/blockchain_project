// eslint-disable-next-line import/no-unresolved
const logger = require('elogger');
const { AuditLogBlockchain } = require('../auditLogs/chain');
// eslint-disable-next-line import/no-unresolved

// eslint-disable-next-line no-unused-vars
async function createBlock() {
  
  const blockChain = new AuditLogBlockchain();
  await blockChain.initialize();

  // eslint-disable-next-line no-plusplus
  for (let idx = 1; idx <= 10; idx++) {
    const payload = {
      user: '1',
      ip: '127.0.0.1',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97',
      action: 'TEST_ACTION',
      rtype: 'TEST',
      ref_id: `TEST_00${idx}`,
      created_on: new Date().getTime(),
    };
    logger.info(`New Block Request: ${payload.ref_id}`);
    // eslint-disable-next-line no-await-in-loop
    const entry = await blockChain.createTransaction(payload);
    logger.info(`New Transaction: ${entry.id}`);
  }

  const status = await blockChain.checkChainValidity();
  logger.info(`Chain Status: ${status ? 'SUCCESS' : 'FAILED'}`);
  process.exit(0);
}
module.exports = createBlock;
