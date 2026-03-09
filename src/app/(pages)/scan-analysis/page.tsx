import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import braincancer from "../../../assets/images/braincancer.png"
import { ArrowRight } from 'lucide-react'
import BreastcancerScan from "../../../assets/images/BreastcancerScan.jpg"
import SkinCancerScan from "../../../assets/images/SkinCancerScan.jpg"
import EyeScan from "../../../assets/images/EyeScan.jpg"
import LungcancerScan from "../../../assets/images/LungcancerScan.jpg"
import HeartScan from "../../../assets/images/Heart Scan.jpg"
import KidneyScan from "../../../assets/images/Kidney Scan.jpg"
import Link from 'next/link'

export default function ScanAnalysis() {
    return <>
        <div className=' min-h-screen w-full flex flex-col bg-[#F8FAFC]'>
            <div className="w-full max-w-350 mx-auto p-4 md:px-6 grow">
                <header className="w-full  py-6 md:py-8 ">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-6 gap-6">

                        <div className="flex flex-col gap-1 md:gap-2">
                            <h1 className="text-slate-900 font-bold text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
                                Scan Analysis
                            </h1>
                            <p className="text-slate-500 font-normal flex items-center text-xs md:text-sm lg:text-base leading-6">

                                Select scan type to start analysis

                            </p>
                        </div>


                    </div>
                </header>
                <div className="p-8 bg-[#F8FAFC]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        <div className="max-w-85 bg-white border border-[#E6EBF4] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-3xl p-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                <Image src={braincancer} alt='braincancer' />
                            </div>

                            <h3 className="font-inter font-bold text-[24px] leading-8 text-[#0D121C] mb-2">
                                MRI Scan
                            </h3>

                            <p className="font-inter font-normal text-[16px] leading-6.5 text-[#47649E] mb-6">
                                Magnetic Resonance Imaging. High-detail analysis for soft tissues, brain activity, and spinal cord assessments.
                            </p>

                            <button className="w-full h-12 mt-5.5 bg-[#064EE0] hover:bg-[#0542c2] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[24px] flex items-center justify-center gap-2 group">
                                <Link href={'/uploadscan'} className='flex items-center'>
                                    <span className="font-inter font-semibold text-[14px] pr-3 text-white">
                                        Continue
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" /></Link>
                            </button>
                        </div>

                        <div className="max-w-85 bg-white border border-[#E6EBF4] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-3xl p-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                <Image src={SkinCancerScan} alt='SkinCancerScan' />
                            </div>

                            <h3 className="font-inter font-bold text-[24px] leading-8 text-[#0D121C] mb-2">
                                Skin Cancer Scan
                            </h3>

                            <p className="font-inter font-normal text-[16px] leading-6.5 text-[#47649E] mb-6">
                                Dermoscopic Imaging. High-detail analysis for skin lesions, melanoma detection, and early-stage skin abnormality assessment.
                            </p>

                            <button className="w-full h-12 bg-[#064EE0] hover:bg-[#0542c2] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[24px] flex items-center justify-center gap-2 group">
                                <Link href={'/uploadscan'} className='flex items-center'>
                                    <span className="font-inter font-semibold text-[14px] pr-3 text-white">
                                        Continue
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" /></Link>
                            </button>
                        </div>
                        <div className="max-w-85 bg-white border border-[#E6EBF4] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-3xl p-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                <Image src={BreastcancerScan} alt='BreastcancerScan' />
                            </div>

                            <h3 className="font-inter font-bold text-[24px] leading-8 text-[#0D121C] mb-2">
                                Breast cancer Scan
                            </h3>

                            <p className="font-inter font-normal text-[16px] leading-6.5 text-[#47649E] mb-6">
                                Ultrasound & Mammography Imaging. High-resolution analysis for tumor detection, mass classification, and breast tissue evaluation
                            </p>

                            <button className="w-full h-12 bg-[#064EE0] hover:bg-[#0542c2] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[24px] flex items-center justify-center gap-2 group">
                                <Link href={'/uploadscan'} className='flex items-center'>
                                    <span className="font-inter font-semibold text-[14px] pr-3 text-white">
                                        Continue
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" /></Link>
                            </button>
                        </div>
                        <div className="max-w-85 bg-white border border-[#E6EBF4] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-3xl p-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                <Image src={EyeScan} alt='EyeScan' />
                            </div>

                            <h3 className="font-inter font-bold text-[24px] leading-8 text-[#0D121C] mb-2">
                                Eye Scan
                            </h3>

                            <p className="font-inter font-normal text-[16px] leading-6.5 text-[#47649E] mb-6">
                                Fundus & OCT Imaging. Detailed retinal analysis for diabetic retinopathy, glaucoma detection, and optic nerve evaluation
                            </p>

                            <button className="w-full h-12 bg-[#064EE0] hover:bg-[#0542c2] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[24px] flex items-center justify-center gap-2 group">
                                <Link href={'/uploadscan'} className='flex items-center'>
                                    <span className="font-inter font-semibold text-[14px] pr-3 text-white">
                                        Continue
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" /></Link>
                            </button>
                        </div>
                        <div className="max-w-85 bg-white border border-[#E6EBF4] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-3xl p-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                <Image src={LungcancerScan} alt='LungcancerScan' />
                            </div>

                            <h3 className="font-inter font-bold text-[24px] leading-8 text-[#0D121C] mb-2">
                                Lung cancer Scan
                            </h3>

                            <p className="font-inter font-normal text-[16px] leading-6.5 text-[#47649E] mb-6">
                                Chest CT Imaging. Detailed analysis for pulmonary nodules, tumor identification, and lung tissue assessment
                            </p>

                            <button className="w-full h-12 bg-[#064EE0] hover:bg-[#0542c2] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[24px] flex items-center justify-center gap-2 group">
                                <Link href={'/uploadscan'} className='flex items-center'>
                                    <span className="font-inter font-semibold text-[14px] pr-3 text-white">
                                        Continue
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" /></Link>
                            </button>
                        </div>
                        <div className="max-w-85 bg-white border border-[#E6EBF4] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-3xl p-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                <Image src={HeartScan} alt='HeartScan' />
                            </div>

                            <h3 className="font-inter font-bold text-[24px] leading-8 text-[#0D121C] mb-2">
                                Heart Scan
                            </h3>

                            <p className="font-inter font-normal text-[16px] leading-6.5 text-[#47649E] mb-6">
                                Cardiac CT Imaging. Advanced visualization for coronary arteries, heart structure evaluation, and cardiovascular disease detection
                            </p>
                            <button className="w-full h-12 bg-[#064EE0] hover:bg-[#0542c2] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[24px] flex items-center justify-center gap-2 group">
                                <Link href={'/uploadscan'} className='flex items-center'>
                                    <span className="font-inter font-semibold text-[14px] pr-3 text-white">
                                        Continue
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" /></Link>
                            </button>
                        </div>

                        <div className="md:col-start-2">
                            <div className="max-w-85 bg-white border border-[#E6EBF4] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-3xl p-8 flex flex-col items-center text-center">
                                <div className="w-20 h-20 mb-4 flex items-center justify-center">
                                    <Image src={KidneyScan} alt='KidneyScan' />
                                </div>

                                <h3 className="font-inter font-bold text-[24px] leading-8 text-[#0D121C] mb-2">
                                    Kidney Scan
                                </h3>

                                <p className="font-inter font-normal text-[16px] leading-6.5 text-[#47649E] mb-6">
                                    Abdominal CT Imaging. High-precision analysis for kidney stones, tumors, and renal structure assessment
                                </p>

                                <button className="w-full h-12 bg-[#064EE0] hover:bg-[#0542c2] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[24px] flex items-center justify-center gap-2 group">
                                    <Link href={'/uploadscan'} className='flex items-center'>
                                        <span className="font-inter font-semibold text-[14px] pr-3 text-white">
                                            Continue
                                        </span>
                                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" /></Link>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    </>
}
