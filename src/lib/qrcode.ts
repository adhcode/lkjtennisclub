import QRCode from 'qrcode'
import { encodeMemberIdForUrl } from './memberUtils'

export async function generateMemberQRCode(membershipId: string, baseUrl: string): Promise<string> {
  try {
    const encodedId = encodeMemberIdForUrl(membershipId)
    const profileUrl = `${baseUrl}/member/${encodedId}`
    
    const qrCodeDataUrl = await QRCode.toDataURL(profileUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#911b1e', // Your website's primary color
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    })
    
    return qrCodeDataUrl
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}

export async function generateMemberQRCodeBuffer(membershipId: string, baseUrl: string): Promise<Buffer> {
  try {
    const encodedId = encodeMemberIdForUrl(membershipId)
    const profileUrl = `${baseUrl}/member/${encodedId}`
    
    const qrCodeBuffer = await QRCode.toBuffer(profileUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#911b1e', // Your website's primary color
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    })
    
    return qrCodeBuffer
  } catch (error) {
    console.error('Error generating QR code buffer:', error)
    throw new Error('Failed to generate QR code')
  }
}