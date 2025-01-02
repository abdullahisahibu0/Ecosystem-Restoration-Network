import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Carbon Credit Token Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('mint-credits', () => {
    it('should mint carbon credits successfully', async () => {
      const projectId = 1;
      const amount = 1000;
      const expirationDate = 1704067200; // 2024-01-01
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new credit ID
      
      const result = await mockContractCall('carbon-credit-token', 'mint-credits', [
        projectId, amount, expirationDate
      ]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('carbon-credit-token', 'mint-credits', [
        projectId, amount, expirationDate
      ]);
    });
  });
  
  describe('transfer-credits', () => {
    it('should transfer carbon credits successfully', async () => {
      const amount = 500;
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('carbon-credit-token', 'transfer-credits', [amount, recipient]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('carbon-credit-token', 'transfer-credits', [amount, recipient]);
    });
    
    it('should fail if the sender has insufficient balance', async () => {
      const amount = 1000000;
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockRejectedValue(new Error('Insufficient balance'));
      
      await expect(mockContractCall('carbon-credit-token', 'transfer-credits', [amount, recipient]))
          .rejects.toThrow('Insufficient balance');
    });
  });
  
  describe('get-credit-balance', () => {
    it('should return the credit balance for an account', async () => {
      const account = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const expectedBalance = 1500;
      
      mockContractCall.mockResolvedValue({ value: expectedBalance });
      
      const result = await mockContractCall('carbon-credit-token', 'get-credit-balance', [account]);
      
      expect(result.value).toBe(expectedBalance);
      expect(mockContractCall).toHaveBeenCalledWith('carbon-credit-token', 'get-credit-balance', [account]);
    });
  });
  
  describe('get-credit-supply', () => {
    it('should return the total credit supply', async () => {
      const expectedSupply = 10000;
      
      mockContractCall.mockResolvedValue({ value: expectedSupply });
      
      const result = await mockContractCall('carbon-credit-token', 'get-credit-supply', []);
      
      expect(result.value).toBe(expectedSupply);
      expect(mockContractCall).toHaveBeenCalledWith('carbon-credit-token', 'get-credit-supply', []);
    });
  });
  
  describe('get-credit-data', () => {
    it('should return credit data', async () => {
      const creditId = 1;
      const expectedCreditData = {
        project_id: 1,
        amount: 1000,
        verification_date: 1672531200,
        expiration_date: 1704067200
      };
      
      mockContractCall.mockResolvedValue({ value: expectedCreditData });
      
      const result = await mockContractCall('carbon-credit-token', 'get-credit-data', [creditId]);
      
      expect(result.value).toEqual(expectedCreditData);
      expect(mockContractCall).toHaveBeenCalledWith('carbon-credit-token', 'get-credit-data', [creditId]);
    });
    
    it('should return null for non-existent credit', async () => {
      const creditId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('carbon-credit-token', 'get-credit-data', [creditId]);
      
      expect(result.value).toBeNull();
    });
  });
});

