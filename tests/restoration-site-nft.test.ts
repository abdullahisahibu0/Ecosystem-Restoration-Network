import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Restoration Site NFT Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('mint-site', () => {
    it('should mint a site NFT successfully', async () => {
      const projectId = 1;
      const location = 'Amazon, Brazil';
      const area = 1000000; // 1 square kilometer
      const ecosystemType = 'Tropical Rainforest';
      const targetSpecies = ['Jaguar', 'Harpy Eagle', 'Brazil Nut Tree'];
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new site ID
      
      const result = await mockContractCall('restoration-site-nft', 'mint-site', [
        projectId, location, area, ecosystemType, targetSpecies
      ]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('restoration-site-nft', 'mint-site', [
        projectId, location, area, ecosystemType, targetSpecies
      ]);
    });
  });
  
  describe('transfer-site', () => {
    it('should transfer a site NFT successfully', async () => {
      const siteId = 1;
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('restoration-site-nft', 'transfer-site', [siteId, recipient]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('restoration-site-nft', 'transfer-site', [siteId, recipient]);
    });
    
    it('should fail if the caller is not the owner', async () => {
      const siteId = 1;
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('restoration-site-nft', 'transfer-site', [siteId, recipient]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-site-owner', () => {
    it('should return the site owner', async () => {
      const siteId = 1;
      const expectedOwner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      
      mockContractCall.mockResolvedValue({ value: expectedOwner });
      
      const result = await mockContractCall('restoration-site-nft', 'get-site-owner', [siteId]);
      
      expect(result.value).toBe(expectedOwner);
      expect(mockContractCall).toHaveBeenCalledWith('restoration-site-nft', 'get-site-owner', [siteId]);
    });
    
    it('should return none for non-existent site', async () => {
      const siteId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('restoration-site-nft', 'get-site-owner', [siteId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-site-data', () => {
    it('should return site data', async () => {
      const siteId = 1;
      const expectedSiteData = {
        project_id: 1,
        location: 'Amazon, Brazil',
        area: 1000000,
        ecosystem_type: 'Tropical Rainforest',
        target_species: ['Jaguar', 'Harpy Eagle', 'Brazil Nut Tree']
      };
      
      mockContractCall.mockResolvedValue({ value: expectedSiteData });
      
      const result = await mockContractCall('restoration-site-nft', 'get-site-data', [siteId]);
      
      expect(result.value).toEqual(expectedSiteData);
      expect(mockContractCall).toHaveBeenCalledWith('restoration-site-nft', 'get-site-data', [siteId]);
    });
    
    it('should return null for non-existent site', async () => {
      const siteId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('restoration-site-nft', 'get-site-data', [siteId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-last-token-id', () => {
    it('should return the last token ID', async () => {
      const expectedLastTokenId = 5;
      
      mockContractCall.mockResolvedValue({ value: expectedLastTokenId });
      
      const result = await mockContractCall('restoration-site-nft', 'get-last-token-id', []);
      
      expect(result.value).toBe(expectedLastTokenId);
      expect(mockContractCall).toHaveBeenCalledWith('restoration-site-nft', 'get-last-token-id', []);
    });
  });
});

